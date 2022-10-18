import React, { useEffect, useState } from 'react';
import './Home.css';
import { TextField, MenuItem, Button } from '@material-ui/core';
import Categories from '../../Data/Categories';
import { useNavigate } from 'react-router';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Home = ({ name, setName, fetchQuestions, setQuestions }) => {
  const [category, setCategory] = useState();
  const [difficultyState, setDifficultyState] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name) return setError(true);
    fetchQuestions(category, difficultyState);
    console.log(category);
    console.log(difficultyState);
    navigate('/quiz');
  };

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  //for make sure does not apear any question in quiz page from before question
  useEffect(() => {
    setQuestions();
  }, []);

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Setting</span>
        <div className="settings_select">
          {error && <ErrorMessage>Please Fill all the fields </ErrorMessage>}
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter your name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Select Category, or will be random"
            value={category}
            variant="outlined"
            onChange={(e) => setCategory(e.target.value)}
          >
            {Categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Select difficulty, or will be default mix."
            variant="outlined"
            value={difficultyState}
            onChange={(e) => setDifficultyState(e.target.value)}
          >
            <MenuItem key="easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Start Quiz
          </Button>
        </div>
      </div>
      <img src="/quizz.svg" className="banner" alt="quiz img" />
    </div>
  );
};

export default Home;
