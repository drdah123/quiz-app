import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Questions.css';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
const Questions = ({
  setQuestions,
  setScore,
  score,
  correct,
  options,
  question,
  current,
  setCurrent,
  setOption,
}) => {
  const [select, setSelect] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSelect = (option) => {
    if (select === option && select === correct) {
      return 'select';
    } else if (select === option && select !== correct) {
      return 'wrong';
    } else if (option === correct) {
      return 'select';
    }
  };

  const handlecheck = (option) => {
    setSelect(option);
    if (option === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (current > 8) {
      navigate('/result');
      setQuestions();
      setOption();
    } else if (select) {
      setCurrent(current + 1);
      setSelect(null);
    } else {
      setError('Please select an option first');
    }
  };

  const handleQuit = () => {
    navigate('/');
  };

  return (
    <div className="question">
      <h1>Question {current + 1}</h1>
      <div className="single-question">
        <h2>{question[current].question}</h2>
        <div className="options">
          {error && <ErrorMessage>{error} </ErrorMessage>}
          {options &&
            options.map((option) => (
              <button
                onClick={() => handlecheck(option)}
                className={`single-option ${select && handleSelect(option)}`}
                key={option}
                disabled={select}
              >
                {option}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            herf="/"
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
