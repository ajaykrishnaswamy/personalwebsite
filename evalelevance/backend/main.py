from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import asyncio
from sqlalchemy.orm import Session, joinedload
from database import engine, Base, SessionLocal
from groq_client import generate_groq_response
from models import Prompt, Model as DBModel, Response as DBResponse

app = FastAPI()

# Allow frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class GenerateRequest(BaseModel):
    prompt: str
    models: List[str]

class GenerateResponse(BaseModel):
    model: str
    response: str
    rank: Optional[int] = None
    medal: Optional[str] = None  # gold, silver, bronze
    hallucination_score: Optional[float] = None  # 0-1, lower is better
    factual: Optional[str] = None  # 'factual' or 'not factual'
    is_judge: Optional[bool] = False

class HistoryResponse(BaseModel):
    prompt: str
    responses: List[GenerateResponse]

JUDGE_MODEL = "llama-3.3-70b-versatile"

class JudgeResponse(BaseModel):
    evaluation: str

@app.post("/generate", response_model=List[GenerateResponse])
async def generate(request: GenerateRequest, db: Session = Depends(get_db)):
    if not request.models:
        raise HTTPException(status_code=400, detail="No models selected.")
    # Store prompt
    prompt_obj = Prompt(text=request.prompt)
    db.add(prompt_obj)
    db.commit()
    db.refresh(prompt_obj)
    # Ensure models exist in DB
    model_objs = {}
    for model_name in request.models:
        model_obj = db.query(DBModel).filter_by(name=model_name).first()
        if not model_obj:
            model_obj = DBModel(name=model_name)
            db.add(model_obj)
            db.commit()
            db.refresh(model_obj)
        model_objs[model_name] = model_obj
    # Generate responses
    tasks = [generate_groq_response(request.prompt, model) for model in request.models]
    results = await asyncio.gather(*tasks)
    # Store responses
    response_objs = []
    for model_name, resp in zip(request.models, results):
        response_obj = DBResponse(prompt_id=prompt_obj.id, model_id=model_objs[model_name].id, text=resp)
        db.add(response_obj)
        response_objs.append(response_obj)
    db.commit()
    # LLM as judge - ask for ranking, hallucination, factuality
    judge_prompt = (
        f"Prompt: {request.prompt}\n" +
        "\n".join([f"Model: {model}\nResponse: {resp}" for model, resp in zip(request.models, results)]) +
        "\n\nFor each model response, please provide the following as a JSON list of objects (one per model):\n" +
        "{model: <model_name>, rank: <1=best>, hallucination_score: <0-1, lower is better>, factual: <'factual' or 'not factual'>}." +
        "\nThen, provide a short evaluation summary explaining your ranking."
    )
    judge_eval = await generate_groq_response(judge_prompt, JUDGE_MODEL)
    # Try to extract JSON and summary from judge_eval
    import re, json
    match = re.search(r'\[.*?\]', judge_eval, re.DOTALL)
    model_scores = []
    summary = judge_eval
    if match:
        try:
            model_scores = json.loads(match.group(0))
            summary = judge_eval[match.end():].strip()
        except Exception:
            model_scores = []
    # Assign medals
    medals = {1: "gold", 2: "silver", 3: "bronze"}
    response_list = []
    for model, resp in zip(request.models, results):
        score = next((s for s in model_scores if s.get("model") == model), {})
        response_list.append(GenerateResponse(
            model=model,
            response=resp,
            rank=score.get("rank"),
            medal=medals.get(score.get("rank")),
            hallucination_score=score.get("hallucination_score"),
            factual=score.get("factual"),
        ))
    # Add judge summary as a special response
    response_list.append(GenerateResponse(
        model="LLM-Judge",
        response=summary,
        is_judge=True
    ))
    return response_list

@app.get("/")
def read_root():
    return {"message": "LLM Eval API is running"}

@app.get("/history", response_model=List[HistoryResponse])
def get_history(db: Session = Depends(get_db)):
    prompts = db.query(Prompt).order_by(Prompt.created_at.desc()).options(joinedload(Prompt.responses).joinedload(DBResponse.model)).all()
    history = []
    for prompt in prompts:
        responses = [GenerateResponse(model=resp.model.name, response=resp.text) for resp in prompt.responses]
        history.append(HistoryResponse(prompt=prompt.text, responses=responses))
    return history

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 