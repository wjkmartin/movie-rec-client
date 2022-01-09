import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import rateSlice from '../rateSlice';

import { gql, useMutation } from '@apollo/client';

import styles from './RateButtons.module.css';

export default function RateButtons() {
  const movieID = useSelector((state) => state.rate.ratingMovieID);
  const userID = useSelector((state) => state.auth.userIndexIdentifier);
  const dispatch = useDispatch();

  const ADD_RATING = gql`
    mutation AddMovieRating($userId: Int!, $movieId: Int!, $rating: Int!) {
      addMovieRating(userId: $userId, id: $movieId, rating: $rating) {
        userId
        id
        rating
      }
    }
  `;

  const [addMovieRating, { data, loading, error }] = useMutation(ADD_RATING);

  if (error) {
    console.log(error);
  }

  function writeUserData(userID, rating) {
    try {
      addMovieRating({
        variables: {
          userId: userID,
          movieId: movieID,
          rating: rating,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick(rating) {
    dispatch(rateSlice.actions.setDidRate(true));
    writeUserData(userID, rating);
  }

  return (
    <div className={styles.RateButtons}>
      <button
        className={`${styles.rateButton} ${styles.rateButton__fullWidth}`}
        onClick={() => {
          handleClick(5);
        }}
      >
        <span className={styles.rateButton__text}>Love it! (⬆)</span>
      </button>
      <div className={styles.rateButtonRow}>
        <button
          className={`${styles.rateButton} ${styles.rateButton__halfWidth}`}
          onClick={() => {
            handleClick(1);
          }}
        >
          <span className={styles.rateButton__text}>
            (⬅) Didn&apos;t like it{' '}
          </span>
        </button>
        <button
          className={`${styles.rateButton} ${styles.rateButton__halfWidth}`}
          onClick={() => {
            handleClick(3);
          }}
        >
          <span className={styles.rateButton__text}>Liked it (➡) </span>
        </button>
      </div>
      <button
        className={`${styles.rateButton} ${styles.rateButton__fullWidth}`}
        onClick={() => {
          dispatch(rateSlice.actions.setDidRate(true));
        }}
      >
        <span className={styles.rateButton__text}>
          Haven&apos;t seen it yet (⬇){' '}
        </span>
      </button>
    </div>
  );
}
