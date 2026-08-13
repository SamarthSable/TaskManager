import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getUserProfile,
  sendPasswordResetEmail,
} from '../../services/authServices';

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
