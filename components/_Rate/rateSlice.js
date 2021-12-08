import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRating: false,
  ratingMovieID: null,
  didRate: false,
};

const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.isRating = action.payload;
    },
    setRatingMovieID: (state, action) => {
      state.ratingMovieID = action.payload;
    },
    setDidRate: (state, action) => {
      state.didRate = action.payload;
    }
  },
});

export const { setRating, setRatingMovieID, setDidRate } = rateSlice.actions;
export default rateSlice;
