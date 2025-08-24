import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <button onClick={() => navigate("/")}>Home</button>
        </li>
        <li>
          <button onClick={() => navigate("/quiz")}>Play</button>
        </li>
        <li>
          <button onClick={() => navigate("/settings")}>Settings</button>
        </li>
        <li>
          <button onClick={() => navigate("/history")}>History</button>
        </li>
      </ul>
    </nav>
  );
}
