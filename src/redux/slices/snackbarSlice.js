import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  message: '',
  type: 'success',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'success';
    },

    hideSnackbar: state => {
      state.visible = false;
      state.message = '';
      state.type = 'success';
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
