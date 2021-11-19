import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: null,
  userID: null,
  userName: null,
  userEmail: null,
  userRole: null,
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
  },
});

export const { setUserID, isSignedIn } = authSlice.actions;
export default authSlice;
