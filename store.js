import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userSlice from './slices/userSlice';
import rateSlice from './components/_Rate/rateSlice';



export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    rate: rateSlice.reducer,

  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

setupListeners(store.dispatch);
