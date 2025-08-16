import React, { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(storedHistory);
    setFilteredHistory(storedHistory);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredHistory(history);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = history.filter(
      (entry) =>
        entry.category.toLowerCase().includes(query) ||
        entry.difficulty.toLowerCase().includes(query) ||
        entry.date.toLowerCase().includes(query)
    );
    setFilteredHistory(filtered);
  }, [searchQuery, history]);

  const clearHistory = () => {
    localStorage.removeItem("quizHistory");
    setHistory([]);
    setFilteredHistory([]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>

      <input
        type="text"
        placeholder="Search by category, difficulty or date..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {filteredHistory.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {filteredHistory.map((entry, index) => (
              <li key={index} className="border p-2 rounded shadow">
                <p>
                  <strong>Category:</strong> {entry.category} |{" "}
                  <strong>Difficulty:</strong> {entry.difficulty}
                </p>
                <p>
                  <strong>Score:</strong> {entry.score}/{entry.total}
                </p>
                <p>
                  <strong>Correct:</strong> {entry.correct} |{" "}
                  <strong>Wrong:</strong> {entry.wrong}
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
