import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import './Quiz.css';
import Questions from '../../components/Questions/Questions';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ name, questions, setQuestions, score, setScore }) => {
  const [options, setOption] = useState();
  const [currentQustion, setCurrentQustion] = useState(0);

  useEffect(() => {
    setOption(
      questions &&
        handleShuffle([
          questions[currentQustion]?.correct_answer,
          ...questions[currentQustion]?.incorrect_answers,
        ])
    );
  }, [questions, currentQustion]);
  useEffect(() => {
    setScore(0);
  }, []);

  console.log(options);

  const handleShuffle = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  };
  return (
    <div className="quiz">
      <span className="subtitle">welcome, {name}</span>
      {questions ? (
        <>
          <div className="quizInfo">
            <span title="Category">{questions[currentQustion].category}</span>
            <span>Score: {score}</span>
          </div>

          <Questions
            question={questions}
            current={currentQustion}
            setCurrent={setCurrentQustion}
            options={options}
            correct={questions[currentQustion]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            setOption={setOption}
          />
        </>
      ) : (
        <div className="circular-progress">
          <CircularProgress
            style={{ margin: 100, marginTop: 200 }}
            color="inherit"
            size={100}
            thickness={1}
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;
