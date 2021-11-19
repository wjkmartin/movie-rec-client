import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRating: false,
  ratingMovieIMDBID: null,
  didRate: false,
};

const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.isRating = action.payload;
    },
    setRatingMovieIMDBID: (state, action) => {
      state.ratingMovieIMDBID = action.payload;
    },
    setDidRate: (state, action) => {
      state.didRate = action.payload;
    }
  },
});

export const { setRating, setRatingMovieIMDBID, setDidRate } = rateSlice.actions;
export default rateSlice;
