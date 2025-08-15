import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

export default function Quiz() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "9"; // Category ID
  const difficulty = queryParams.get("difficulty") || "easy";

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [error, setError] = useState(false);

  const fetchQuestions = useCallback(() => {
    setLoading(true);
    setError(false);

    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data);
        if (
          !data.results ||
          !Array.isArray(data.results) ||
          data.results.length === 0
        ) {
          console.error("Unexpected data format or empty results:", data);

          setError(true);
          setLoading(false);
          return;
        }

        const formattedQuestions = data.results.map((question) => {
          const answers = [...question.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * (answers.length + 1));
          answers.splice(randomIndex, 0, question.correct_answer);

          return {
            question: question.question,
            answers: answers,
            correctAnswer: question.correct_answer,
          };
        });

        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError(true);
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

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
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

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error loading questions. Please try again later.</div>;

  if (quizCompleted) {
    return (
      <div className="quiz-completed">
        <h2>Quiz Completed!</h2>
        <p>
          Your score: {score} out of {questions.length}
        </p>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h2>
        Quiz: {category} - {difficulty}
      </h2>
      <div className="question">
        <p>{questions[currentQuestionIndex].question}</p>
        <ul>
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <li key={index}>
              <button onClick={() => handleAnswer(answer)}>{answer}</button>
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
