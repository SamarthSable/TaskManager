import { createSlice } from '@reduxjs/toolkit';

import {
  signupThunk,
  loginThunk,
  logoutThunk,
  restoreSessionThunk,
  getUserProfileThunk,
  forgotPasswordThunk,
} from '../thunks/authThunks';

const initialState = {
  user: null,
  profile: null,

  isAuthenticated: false,

  loading: false,

  error: null,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    clearAuthError: state => {
      state.error = null;
    },

    clearAuth: state => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder

      /* 
         SIGNUP
       */

      .addCase(signupThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload;

        state.isAuthenticated = true;

        state.error = null;
      })

      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* 
         LOGIN
       */

      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload;

        state.isAuthenticated = true;

        state.error = null;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* 
         LOGOUT
       */

      .addCase(logoutThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutThunk.fulfilled, state => {
        state.loading = false;

        state.user = null;
        state.profile = null;

        state.isAuthenticated = false;

        state.error = null;
      })

      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* 
         RESTORE SESSION
       */

      .addCase(restoreSessionThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restoreSessionThunk.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.user = action.payload.authUser;

          state.profile = action.payload.profile;

          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.profile = null;
          state.isAuthenticated = false;
        }

        state.error = null;
      })

      .addCase(restoreSessionThunk.rejected, (state, action) => {
        state.loading = false;

        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;

        state.error = action.payload;
      })

      /* 
         GET PROFILE
       */

      .addCase(getUserProfileThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = action.payload;

        state.error = null;
      })

      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* 
         FORGOT PASSWORD
       */

      .addCase(forgotPasswordThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(forgotPasswordThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })

      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { clearAuthError, clearAuth } = authSlice.actions;

export default authSlice.reducer;
