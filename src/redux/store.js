import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authslices';
import snackbarReducer from './slices/snackbarSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
  },
});
