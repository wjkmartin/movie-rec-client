import thunk from 'redux-thunk'

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { movieAPI } from './services/rate/movie';
import userSlice from './slices/userSlice';
import rateSlice from './components/_Rate/rateSlice';

import { firestoreReducer } from 'redux-firestore'

import {
  getFirebase,
} from 'react-redux-firebase'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [movieAPI.reducerPath]: movieAPI.reducer,
    user: userSlice.reducer,
    rate: rateSlice.reducer,
    firestore: firestoreReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(movieAPI.middleware)
    .concat(thunk.withExtraArgument({ getFirebase }))
});

setupListeners(store.dispatch);
