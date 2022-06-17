import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;