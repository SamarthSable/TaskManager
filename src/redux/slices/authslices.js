import { createSlice } from '@reduxjs/toolkit';

import {
  signupThunk,
  loginThunk,
  logoutThunk,
  restoreSessionThunk,
  getUserProfileThunk,
  forgotPasswordThunk,
  sendOtpThunk,
  verifyOtpThunk,
} from '../thunks/authThunks';

const initialState = {
  user: null,
  profile: null,

  isAuthenticated: false,

  loading: false,

  error: null,
  // OTP state
  otpEmail: null,
  otpVerified: false,

  resetLoading: false,

  resetLoading: false,
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

      /* =========================================
       SEND OTP
    ========================================= */
      .addCase(sendOtpThunk.pending, state => {
        state.resetLoading = true;
        state.error = null;
      })

      .addCase(sendOtpThunk.fulfilled, (state, action) => {
        state.resetLoading = false;

        state.otpEmail = action.payload.email;
        state.otp = action.payload.otp;
        state.otpExpiresAt = action.payload.expiresAt;

        state.otpVerified = false;
      })

      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.resetLoading = false;
        state.error = action.payload;
      })

      /* =========================================
       VERIFY OTP
    ========================================= */

      .addCase(verifyOtpThunk.pending, state => {
        state.resetLoading = true;
        state.error = null;
      })

      .addCase(verifyOtpThunk.fulfilled, state => {
        state.resetLoading = false;
        state.otpVerified = true;
      })

      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.resetLoading = false;
        state.otpVerified = false;
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
