"use client";
import React, { useState, useEffect } from "react";

const modelsList = [
  { id: 1, name: "gemma2-9b-it" },
  { id: 2, name: "meta-llama/Llama-Guard-4-12B" },
  { id: 3, name: "llama-3.3-70b-versatile" },
  { id: 4, name: "llama-3.1-8b-instant" },
  { id: 5, name: "llama3-70b-8192" },
  { id: 6, name: "llama3-8b-8192" },
];

const BACKEND_URL = "http://localhost:8000";

const medalColors: Record<string, string> = {
  gold: 'bg-yellow-300 text-yellow-900',
  silver: 'bg-gray-300 text-gray-800',
  bronze: 'bg-amber-700 text-amber-100',
};
const medalEmojis: Record<string, string> = {
  gold: '🥇',
  silver: '🥈',
  bronze: '🥉',
};

export default function Home() {
  const [tab, setTab] = useState("dashboard");
  const [prompt, setPrompt] = useState("");
  const [selectedModels, setSelectedModels] = useState<number[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [judgeResult, setJudgeResult] = useState<any>(null);

  const handleModelSelect = (id: number) => {
    setSelectedModels((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    setJudgeResult(null);
    try {
      const modelNames = modelsList
        .filter((m) => selectedModels.includes(m.id))
        .map((m) => m.name);
      const res = await fetch(`${BACKEND_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, models: modelNames }),
      });
      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();
      const judge = data.find((item: any) => item.is_judge);
      setJudgeResult(judge);
      setResults(
        data.filter((item: any) => !item.is_judge).map((item: any) => ({
          ...item,
        }))
      );
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/history`);
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (tab === "history") {
      fetchHistory();
    }
  }, [tab]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded-t font-semibold border-b-2 ${
              tab === "dashboard"
                ? "border-blue-600 text-blue-600 bg-white"
                : "border-transparent text-gray-600 bg-gray-100"
            }`}
            onClick={() => setTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 rounded-t font-semibold border-b-2 ${
              tab === "history"
                ? "border-blue-600 text-blue-600 bg-white"
                : "border-transparent text-gray-600 bg-gray-100"
            }`}
            onClick={() => setTab("history")}
          >
            History
          </button>
          <button
            className={`px-4 py-2 rounded-t font-semibold border-b-2 ${
              tab === "analytics"
                ? "border-blue-600 text-blue-600 bg-white"
                : "border-transparent text-gray-600 bg-gray-100"
            }`}
            onClick={() => setTab("analytics")}
          >
            Analytics
          </button>
        </div>
        {tab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">LLM Eval Dashboard</h1>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow p-6 mb-8"
            >
              <label className="block mb-2 font-semibold">Experiment Prompt</label>
              <textarea
                className="w-full border rounded p-2 mb-4"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
              <label className="block mb-2 font-semibold">Select Models</label>
              <div className="flex flex-wrap gap-4 mb-4">
                {modelsList.map((model) => (
                  <label key={model.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(model.id)}
                      onChange={() => handleModelSelect(model.id)}
                    />
                    {model.name}
                  </label>
                ))}
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Evaluating..." : "Evaluate"}
              </button>
            </form>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <section>
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              {results.length === 0 && <p className="text-gray-500">No results yet.</p>}
              <div className="grid gap-4">
                {results
                  .sort((a, b) => (a.rank || 99) - (b.rank || 99))
                  .map((res, idx) => (
                    <div
                      key={idx}
                      className={`bg-white rounded shadow p-4 flex flex-col gap-2 ${res.medal ? medalColors[res.medal] : ''}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">
                          {res.model}
                          {res.medal && (
                            <span className="ml-2 text-2xl align-middle">{medalEmojis[res.medal]}</span>
                          )}
                        </span>
                        {res.rank && (
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                            Rank: {res.rank}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="font-semibold">Response:</span>
                        <p className="ml-2 text-gray-700 whitespace-pre-line">{res.response}</p>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <span className="font-semibold">Hallucination Score:</span>
                          <span className="ml-2">{res.hallucination_score !== undefined ? res.hallucination_score : '-'}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Factual:</span>
                          <span className="ml-2">{res.factual || '-'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                {judgeResult && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded shadow p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-yellow-700">LLM-Judge</span>
                    </div>
                    <div>
                      <span className="font-semibold text-yellow-700">Summary:</span>
                      <p className="ml-2 text-gray-800 whitespace-pre-line text-base font-medium">{judgeResult.response}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
        {tab === "history" && (
          <section>
            <h1 className="text-2xl font-bold mb-6 text-center">History</h1>
            {historyLoading ? (
              <p>Loading history...</p>
            ) : history.length === 0 ? (
              <p className="text-gray-500">No history found.</p>
            ) : (
              <div className="flex flex-col gap-6">
                {history.map((item, idx) => {
                  const judge = item.responses.find((r: any) => r.is_judge);
                  const others = item.responses.filter((r: any) => !r.is_judge);
                  return (
                    <div key={idx} className="bg-white rounded shadow p-4">
                      <div className="mb-2">
                        <span className="font-semibold">Prompt:</span> {item.prompt}
                      </div>
                      <div className="ml-4">
                        {others
                          .sort((a: any, b: any) => (a.rank || 99) - (b.rank || 99))
                          .map((res: any, ridx: number) => (
                            <div key={ridx} className={`mb-2 ${res.medal ? medalColors[res.medal] : ''}`}>
                              <span className="font-bold">
                                {res.model}
                                {res.medal && (
                                  <span className="ml-2 text-xl align-middle">{medalEmojis[res.medal]}</span>
                                )}
                              </span>:
                              <span className="ml-2 text-gray-700">{res.response}</span>
                              <span className="ml-4 text-xs">[Rank: {res.rank || '-'}, Hallucination: {res.hallucination_score !== undefined ? res.hallucination_score : '-'}, Factual: {res.factual || '-'}]</span>
                            </div>
                          ))}
                        {judge && (
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-3 mt-2">
                            <span className="font-bold text-yellow-700">LLM-Judge:</span>
                            <span className="ml-2 text-gray-800 whitespace-pre-line text-base font-medium">{judge.response}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
        {tab === "analytics" && (
          <section>
            <h1 className="text-2xl font-bold mb-6 text-center">Analytics (Coming Soon)</h1>
            <p className="text-gray-500 text-center">Analytics features will be available here.</p>
          </section>
        )}
      </div>
    </main>
  );
}
