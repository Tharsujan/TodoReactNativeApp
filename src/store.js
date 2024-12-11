// store.js
import {configureStore} from '@reduxjs/toolkit';
import {todoApi} from './Services/TodoApi';

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer, // Add todoApi reducer to store
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(todoApi.middleware), // Add todoApi middleware for caching and handling requests
});
