import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './Result.css';

const Result = ({ name, score }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);
  return (
    <div className="result">
      <span className="title">
        good try {name} you got {score}/10
      </span>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: 'center', marginTop: 20 }}
        href="/"
      >
        go to Home page
      </Button>
    </div>
  );
};

export default Result;
