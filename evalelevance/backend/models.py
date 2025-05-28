from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Prompt(Base):
    __tablename__ = "prompts"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    responses = relationship("Response", back_populates="prompt")

class Model(Base):
    __tablename__ = "models"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    version = Column(String, nullable=True)
    responses = relationship("Response", back_populates="model")

class Response(Base):
    __tablename__ = "responses"
    id = Column(Integer, primary_key=True, index=True)
    prompt_id = Column(Integer, ForeignKey("prompts.id"))
    model_id = Column(Integer, ForeignKey("models.id"))
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    prompt = relationship("Prompt", back_populates="responses")
    model = relationship("Model", back_populates="responses")
    evaluation = relationship("EvaluationScore", back_populates="response", uselist=False)

class EvaluationScore(Base):
    __tablename__ = "evaluation_scores"
    id = Column(Integer, primary_key=True, index=True)
    response_id = Column(Integer, ForeignKey("responses.id"))
    robustness_score = Column(Float, nullable=True)
    factual = Column(String, nullable=True)  # 'factual' or 'not factual'
    suggestions = Column(Text, nullable=True)  # For recommendations
    response = relationship("Response", back_populates="evaluation") 