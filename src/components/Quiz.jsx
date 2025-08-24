import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./quiz.css"; // 👈 import our CSS

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "9";
  const difficulty = queryParams.get("difficulty") || "easy";

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    sound: true,
    music: true,
    fontSize: "base",
    profileName: "",
    profileAvatar: "",
  });

  const correctSound = useRef(null);
  const wrongSound = useRef(null);

  useEffect(() => {
    const savedSound = localStorage.getItem("sound");
    const savedMusic = localStorage.getItem("music");
    const savedFontSize = localStorage.getItem("fontSize");
    const savedName = localStorage.getItem("profileName");
    const savedAvatar = localStorage.getItem("profileAvatar");

    setSettings({
      sound: savedSound !== null ? savedSound === "true" : true,
      music: savedMusic !== null ? savedMusic === "true" : true,
      fontSize: savedFontSize || "base",
      profileName: savedName || "",
      profileAvatar: savedAvatar || "",
    });

    correctSound.current = new Audio("/sounds/correct.mp3");
    wrongSound.current = new Audio("/sounds/wrong.mp3");
  }, []);

  const sampleQuestions = [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: "Mars",
    },
  ];

  const fetchQuestions = useCallback(() => {
    setLoading(true);
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

    fetch(url)
      .then((res) => {
        if (res.status === 429) throw new Error("Rate limit reached");
        return res.json();
      })
      .then((data) => {
        if (
          data.response_code !== 0 ||
          !Array.isArray(data.results) ||
          data.results.length === 0
        ) {
          setQuestions(sampleQuestions);
          setLoading(false);
          return;
        }

        const formatted = data.results.map((q) => {
          const answers = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * (answers.length + 1));
          answers.splice(randomIndex, 0, q.correct_answer);
          return {
            question: q.question,
            answers: answers,
            correctAnswer: q.correct_answer,
          };
        });
        setQuestions(formatted);
        setLoading(false);
      })
      .catch(() => {
        setQuestions(sampleQuestions);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, difficulty]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;

    if (settings.sound) {
      if (isCorrect) correctSound.current.play();
      else wrongSound.current.play();
    }

    if (isCorrect) setScore((prev) => prev + 1);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) setCurrentQuestionIndex(nextIndex);
    else {
      setQuizCompleted(true);
      const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
      history.push({
        score,
        total: questions.length,
        category,
        difficulty,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem("quizHistory", JSON.stringify(history));
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    fetchQuestions();
  };

  if (loading) return <div>Loading questions...</div>;

  if (quizCompleted) {
    return (
      <div className="quiz-completed">
        {settings.profileAvatar && (
          <img src={settings.profileAvatar} alt="avatar" />
        )}
        {settings.profileName && <p>Player: {settings.profileName}</p>}
        <h2>Quiz Completed!</h2>
        <p>
          Score: {score} / {questions.length}
        </p>
        <button onClick={restartQuiz}>Restart</button>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      {settings.profileAvatar && (
        <img src={settings.profileAvatar} alt="avatar" />
      )}
      {settings.profileName && <p>Player: {settings.profileName}</p>}
      <h2>
        Quiz: Category {category} - Difficulty {difficulty}
      </h2>
      <div className="question">
        <p
          dangerouslySetInnerHTML={{
            __html: questions[currentQuestionIndex].question,
          }}
        />
        <ul>
          {questions[currentQuestionIndex].answers.map((answer, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleAnswer(answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="score">
        <p>Score: {score}</p>
        <p>
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
}
