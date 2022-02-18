import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  needToRegenRecs: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNeedToRegenRecs: (state, action) => {
      state.needToRegenRecs = action.payload;
    },
  },
});

export const { setNeedToRegenRecs } = userSlice.actions;
export default userSlice;
