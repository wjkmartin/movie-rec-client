import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import styles from './AddToSavedMoviesButton.module.css';
import { getFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const AddToSavedMoviesButton = ({ movieId, savedMoviesById=[] }) => {
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
    <Button
      className={`${styles.AddToSavedMoviesButton} ${
        isSaved ? styles.isSaved : ''
      }`}
      color="inherit"
      variant="text"
      onClick={handleClick}
    >
      <span>
        {isSaved ? '✔ Added to saved movies' : 'Add to my saved movies'}
      </span>
    </Button>
  );
};

export default AddToSavedMoviesButton;
