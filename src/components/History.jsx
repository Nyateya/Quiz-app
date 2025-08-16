import React, { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("quizHistory");
    setHistory([]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      {history.length === 0 ? (
        <p>No quiz history yet.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {history.map((entry, index) => (
              <li key={index} className="border p-2 rounded shadow">
                <p>
                  <strong>Category:</strong> {entry.category} |{" "}
                  <strong>Difficulty:</strong> {entry.difficulty}
                </p>
                <p>
                  <strong>Score:</strong> {entry.score}/{entry.total}
                </p>
                <p className="text-sm text-gray-500">{entry.date}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={clearHistory}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear History
          </button>
        </>
      )}
    </div>
  );
}
