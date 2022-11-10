import React, { useState } from "react";
import { q } from "./questions";
import { FcOk } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import "./Quiz.css";
import { Button, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
const questions = q.sort(() => Math.random() - 0.5);
questions.map((question, idx) => {
  question.answerOptions = question.answerOptions.sort(
    () => Math.random() - 0.5
  );
  return question;
});
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const handleAnswerOptionClick = (isCorrect, answerText) => {
    setIsAnswered(true);
    console.log(isCorrect);
    if (isCorrect) {
      setScore(score + 1);

      setResult([
        ...result,
        [
          questions[currentQuestion].questionText,

          `You answered ${answerText}`,
          `Correct!`,
        ],
      ]);
    }
    if (!isCorrect) {
      setResult([
        ...result,
        [
          questions[currentQuestion].questionText,
          `You answered ${answerText}`,
          `Incorrect! The correct answer is: ${q[currentQuestion].correctAnswer}`,
        ],
      ]);
    }
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
        setShowResult(true);
      }
      setIsAnswered(false);
    }, 700);
  };
  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <h3>
            You scored {score} out of {questions.length}
          </h3>
          <Button onClick={() => window.location.reload(false)}>
            Restart Quiz
          </Button>
          <Box className="results">
            {result.map((item, index) => (
              <Card
                key={index}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                  margin: "1rem",
                  borderRadius: "1rem",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <p>
                      Question {index + 1}: {item[0]}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    {item[2] === "Correct!" ? (
                      <FcOk size={20} />
                    ) : (
                      <MdCancel size={20} />
                    )}
                    <p>{item[1]}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{item[2]}</p>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Box>
        </div>
      ) : (
        <Grid className="container">
          <div>
            <Card className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </Card>
            <Card className="answer-section">
              {questions[currentQuestion].answerOptions.map(
                (answerOption, idx) => (
                  <button
                    key={idx}
                    className={
                      isAnswered
                        ? answerOption.isCorrect
                          ? "answer-button-correct"
                          : "answer-button-incorrect"
                        : "answer-button"
                    }
                    onClick={() =>
                      handleAnswerOptionClick(
                        answerOption.isCorrect,
                        answerOption.answerText
                      )
                    }
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </Card>
          </div>
        </Grid>
      )}
    </div>
  );
};

export default Quiz;