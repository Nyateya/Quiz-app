/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "9"; // Default category
  const difficulty = queryParams.get("difficulty") || "easy";

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  // ✅ Fallback sample questions
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

  // Fetch questions
  const fetchQuestions = useCallback(() => {
    setLoading(true);
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    console.log("Fetching:", url);

    fetch(url)
      .then((res) => {
        if (res.status === 429) {
          throw new Error(
            "Rate limit reached. Please wait a bit and try again."
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log("API response:", data);

        if (
          data.response_code !== 0 ||
          !Array.isArray(data.results) ||
          data.results.length === 0
        ) {
          console.warn("No questions found, using sample fallback.");
          setQuestions(sampleQuestions); // ✅ fallback to sample
          setLoading(false);
          return;
        }

        // Format API questions
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
      .catch((err) => {
        console.error("Error fetching questions:", err.message);
        console.warn("Using fallback sample questions instead.");
        setQuestions(sampleQuestions); // ✅ fallback
        setLoading(false);
      });
  }, [category, difficulty]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    fetchQuestions();
  };

  // UI states
  if (loading) return <div>Loading questions...</div>;
  if (quizCompleted) {
    return (
      <div className="quiz-completed">
        <h2>Quiz Completed!</h2>
        <p>
          Your score: {score} out of {questions.length}
        </p>
        <button onClick={restartQuiz}>Restart Quiz</button>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="quiz">
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
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <li key={index}>
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
