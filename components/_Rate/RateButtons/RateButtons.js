import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getDatabase, ref, update } from 'firebase/database';

import rateSlice from '../rateSlice';

export default function RateButtons() {
  const movieID = useSelector((state) => state.rate.ratingMovieIMDBID);
  const userID = useSelector((state) => state.auth.userID);
  const dispatch = useDispatch();

  function writeUserData(userID, movieID, rating) {
    const db = getDatabase();
    update(ref(db, 'ratingsByUID/' + userID), {
      [movieID]: rating
    });
  }

  function handleClick(rating) {
    writeUserData(userID, movieID, rating);
    dispatch(rateSlice.actions.setDidRate(true));
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
