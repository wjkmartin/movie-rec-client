import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userSlice from './slices/userSlice';
import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  firebase: firebaseReducer
})

export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

setupListeners(store.dispatch);
