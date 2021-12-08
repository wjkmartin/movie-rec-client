import React from 'react';
import { useAddRatingMutation } from '../../../services/rate/rating';
import { useSelector, useDispatch } from 'react-redux';
import rateSlice from '../rateSlice';

export default function RateButtons() {
  const movieID = useSelector((state) => state.rate.ratingMovieID);
  const userID = useSelector((state) => state.auth.userID);
  const dispatch = useDispatch();
  const [addRating, { isLoading }] = useAddRatingMutation();

  function writeUserData(userID, rating) {
    try {
      addRating({userId: 1, movieId: movieID, rating: rating});
    }
    catch (error) {
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
