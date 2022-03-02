import React, { useState, useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import styles from './AddToSavedButton.module.css';
import { getFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Star } from '@mui/icons-material';

const AddToSavedButton = ({ movieId, savedMoviesById = [] }) => {
  const [isSaved, setIsSaved] = useState(false);
  const firebase = getFirebase();
  const auth = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    if (savedMoviesById.includes(movieId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [movieId, savedMoviesById]);

  const handleClick = () => {
    if (isSaved) {
      const newSavedMoviesById = savedMoviesById.filter(
        (movie) => movie !== movieId
      );
      firebase.set(`users/${auth.uid}/savedMoviesById/`, newSavedMoviesById);
    } else {
      const newSavedMoviesById = [...savedMoviesById, movieId];
      firebase.set(`users/${auth.uid}/savedMoviesById/`, newSavedMoviesById);
    }
    setIsSaved(!isSaved);
  };

  return (
    <Button variant="text" onClick={handleClick}>
      <Stack spacing={1} direction="row">
        <Star
          sx={{ color: isSaved ? 'success.main' : 'text.primary' }}
        />
        <Typography
          sx={{ color: isSaved ? 'success.main' : 'text.primary' }}
        >
          {isSaved ? 'SAVED' : 'ADD TO SAVED'}
        </Typography>
      </Stack>
    </Button>
  );
};

export default AddToSavedButton;
