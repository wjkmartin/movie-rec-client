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
    },
    logoutUser: (state) => {
      state.userID = null;
      state.isSignedIn = null;
      state.userIndexIdentifier = null;
      state.userName = null;
      state.userEmail = null;
      state.userRole = null;
      state.savedMoviesById = [];
    },
  },
});

export const { setUserID, isSignedIn, setUserIndexIdentifier, logoutUser } =
  userSlice.actions;
export default userSlice;
