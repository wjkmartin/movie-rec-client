import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import rateSlice from '../rateSlice';

import { gql, useMutation } from '@apollo/client';

export default function RateButtons() {
  const movieID = useSelector((state) => state.rate.ratingMovieID);
  const userID = useSelector((state) => state.auth.userID);
  const dispatch = useDispatch();

  const ADD_RATING = gql`
    mutation AddMovieRating(
      $userId: Int!
      $movieId: Int!
      $rating: Int!
    ) {
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
    writeUserData(1, rating);
  }

  return (
    <div>
      <button
        onClick={() => {
          handleClick(1);
        }}
      >
        Thumb up
      </button>
      <button
        onClick={() => {
          handleClick(2);
        }}
      >
        Love
      </button>
      <button
        onClick={() => {
          handleClick(-1);
        }}
      >
        Thumb down
      </button>
    </div>
  );
}
