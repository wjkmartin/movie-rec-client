import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: null,
  userID: null,
  userIndexIdentifier: null,
  userName: null,
  userEmail: null,
  userRole: null,
  savedMoviesById: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    isSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setUserIndexIdentifier: (state, action) => {
      state.userIndexIdentifier = action.payload;
    }
  },
});

export const { setUserID, isSignedIn, setUserIndexIdentifier } = authSlice.actions;
export default authSlice;
