import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Button } from '@mui/material';
import styles from './AddToSavedMoviesButton.module.css';

const AddToSavedMoviesButton = ({ movieId }) => {
  const [isSaved, setIsSaved] = useState(false);
    
  const handleClick = () => {
    setIsSaved(!isSaved);
  }

  return (
    <Button
      className={`${styles.AddToSavedMoviesButton} ${
        isSaved ? styles.isSaved : ''
      }`}
      color="inherit"
      variant="text"
      onClick={handleClick}
    >
      <span>{isSaved ? '✔ Added to saved movies' : 'Add to my saved movies'}</span>
    </Button>
  );
};

export default AddToSavedMoviesButton;
