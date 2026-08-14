import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getUserProfile,
  sendPasswordResetEmail,
} from '../../services/authServices';

import { sendOtp, verifyOtp } from '../../services/otpServices';
/* 
   SIGN UP
 */

export const signupThunk = createAsyncThunk(
  'auth/signup',

  async (userData, { rejectWithValue }) => {
    try {
      const user = await signupUser(userData);

      return user;
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  },
);

/* 
   LOGIN
 */

export const loginThunk = createAsyncThunk(
  'auth/login',

  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await loginUser(email, password);

      return user;
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  },
);

/* 
   LOGOUT
 */

export const logoutThunk = createAsyncThunk(
  'auth/logout',

  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();

      return true;
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  },
);

/* 
   RESTORE SESSION
 */

export const restoreSessionThunk = createAsyncThunk(
  'auth/restoreSession',

  async (_, { rejectWithValue }) => {
    try {
      const user = getCurrentUser();

      if (!user) {
        return null;
      }

      const profile = await getUserProfile(user.uid);

      return {
        authUser: user,
        profile,
      };
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  },
);

/* 
   GET USER PROFILE
 */

export const getUserProfileThunk = createAsyncThunk(
  'auth/getUserProfile',

  async (uid, { rejectWithValue }) => {
    try {
      const profile = await getUserProfile(uid);

      return profile;
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  },
); /* =========================================
   SEND OTP
========================================= */

export const sendOtpThunk = createAsyncThunk(
  'auth/sendOtp',

  async ({ email }, { rejectWithValue }) => {
    try {
      const trimmedEmail = email?.trim().toLowerCase();

      if (!trimmedEmail) {
        return rejectWithValue('Please enter your email address.');
      }

      const result = await sendOtp(trimmedEmail);

      return result;
    } catch (error) {
      console.log('Send OTP Error:', error);

      return rejectWithValue(
        error?.message || 'Unable to send OTP. Please try again.',
      );
    }
  },
);

/* =========================================
   VERIFY OTP
========================================= */

export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',

  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const trimmedEmail = email?.trim().toLowerCase();
      const enteredOtp = otp?.trim();

      if (!trimmedEmail) {
        return rejectWithValue('Email address is required.');
      }

      if (!enteredOtp) {
        return rejectWithValue('Please enter the OTP.');
      }

      if (enteredOtp.length !== 6) {
        return rejectWithValue('Please enter a valid 6-digit OTP.');
      }

      // OTP is verified from Firestore
      const result = await verifyOtp({
        email: trimmedEmail,
        enteredOtp,
      });

      return {
        email: trimmedEmail,
        verified: result,
      };
    } catch (error) {
      console.log('Verify OTP Error:', error);

      return rejectWithValue(
        error?.message || 'Invalid OTP. Please try again.',
      );
    }
  },
);

/* =========================================
   RESET PASSWORD
========================================= */

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const normalizedEmail = email?.trim().toLowerCase();

      if (!normalizedEmail) {
        return rejectWithValue('Email is required.');
      }

      if (!newPassword) {
        return rejectWithValue('Please enter a new password.');
      }

      if (newPassword.length < 6) {
        return rejectWithValue('Password should be at least 6 characters.');
      }

      const result = await resetUserPassword(normalizedEmail, newPassword);

      return result;
    } catch (error) {
      return rejectWithValue(error?.message || 'Unable to reset password.');
    }
  },
);
/* 
   FORGOT PASSWORD
 */

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',

  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(email);

      return true;
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  },
);

/* 
   FIREBASE ERROR HANDLER
 */

const getAuthErrorMessage = error => {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';

    case 'auth/invalid-email':
      return 'Please enter a valid email address.';

    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';

    case 'auth/user-not-found':
      return 'No account found with this email.';

    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';

    case 'auth/user-disabled':
      return 'This account has been disabled.';

    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';

    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';

    default:
      return error?.message || 'Something went wrong.';
  }
};
