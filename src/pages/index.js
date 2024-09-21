import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Load quiz data from local JSON file
  useEffect(() => {
    fetch("/quiz.json")
      .then((response) => response.json())
      .then((data) => setQuizData(data));
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  // Function to restart the quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <>
      <Head>
        <title>Quiz App</title>
        <meta
          name='description'
          content='Simple Quiz App'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>

      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>Quiz App</h1>

          {showResult ? (
            <div className={styles.result}>
              <h2>
                Your Score: {score} / {quizData.length}
              </h2>
              <p>Thanks for playing!</p>
              {/* Restart button */}
              <button
                className={styles.restartButton}
                onClick={restartQuiz}>
                Restart Quiz
              </button>
            </div>
          ) : quizData.length > 0 ? (
            <div className={styles.quiz}>
              <h2>{quizData[currentQuestionIndex].question}</h2>
              <ul className={styles.options}>
                {quizData[currentQuestionIndex].options.map((option) => (
                  <li
                    key={option}
                    className={`${styles.option} ${
                      selectedOption === option ? styles.selected : ""
                    }`}
                    onClick={() => handleOptionClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>

              <button
                className={styles.nextButton}
                onClick={handleNextQuestion}
                disabled={!selectedOption}>
                Next
              </button>
            </div>
          ) : (
            <p>Loading quiz...</p>
          )}
        </main>

        <footer className={styles.footer}>
          <p>© 2024 Quiz App. All rights reserved. By fouzaan, 100857977</p>
        </footer>
      </div>
    </>
  );
}
