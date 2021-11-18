import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { movieAPI } from './services/movie'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [movieAPI.reducerPath]: movieAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieAPI.middleware),
})

setupListeners(store.dispatch)