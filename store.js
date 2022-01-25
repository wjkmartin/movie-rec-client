import thunk from 'redux-thunk'

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userSlice from './slices/userSlice';
import rateSlice from './components/_Rate/rateSlice';

import { firestoreReducer } from 'redux-firestore'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    user: userSlice.reducer,
    rate: rateSlice.reducer,
    firestore: firestoreReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

setupListeners(store.dispatch);
