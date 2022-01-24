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

const userSlice = createSlice({
  name: 'user',
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

export const { setUserID, isSignedIn, setUserIndexIdentifier } = userSlice.actions;
export default userSlice;
