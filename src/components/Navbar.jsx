import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onStart }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-200 p-4 flex gap-4 justify-center shadow-md">
      <button onClick={() => navigate("/")}>Home</button>
      <button
        onClick={() => {
          if (onStart) onStart();
          navigate("/quiz");
        }}
      >
        Play
      </button>
      <button onClick={() => navigate("/history")}>History</button>
      <button onClick={() => navigate("/settings")}>Settings</button>
    </nav>
  );
}
