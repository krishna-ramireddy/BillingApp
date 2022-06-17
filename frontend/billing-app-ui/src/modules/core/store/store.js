import { configureStore } from '@reduxjs/toolkit';

import authenticationSliceReducer from './authenticationSlice';

const store = configureStore({
  reducer: { auth: authenticationSliceReducer },
});

export default store;
