import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@react-native-firebase/auth';

import { doc, setDoc, getDoc } from '@react-native-firebase/firestore';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { firebaseAuth, db } from '../config/firebase';

/*
   SERIALIZE FIREBASE USER
*/

const serializeUser = user => {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
  };
};

/*
   AUTH STATE LISTENER

*/

export const subscribeToAuthChanges = callback => {
  return onAuthStateChanged(firebaseAuth, async user => {
    console.log('Auth state changed:', user ? user.email : 'No user');

    if (!user) {
      callback(null);
      return;
    }

    const authUser = serializeUser(user);

    let profile = null;

    try {
      const userDoc = await getDoc(doc(db, 'Users', user.uid));

      if (userDoc.exists()) {
        profile = userDoc.data();
      }

      console.log('User profile:', profile);
    } catch (error) {
      console.log('Profile fetch error:', error);
    }

    callback({
      user: authUser,
      profile: profile,
    });
  });
};
/*
   SIGN UP
*/

export const signupUser = async userData => {
  const { firstName, lastName, email, password, phone, company } = userData;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email.trim(),
      password,
    );

    const user = userCredential.user;

    await setDoc(doc(db, 'Users', user.uid), {
      uid: user.uid,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      createdAt: new Date().toISOString(),
    });

    console.log('Signup successful:', user.email);

    return serializeUser(user);
  } catch (error) {
    console.log('Signup Error:', error);

    throw error;
  }
};

/*
   LOGIN
*/

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email.trim(),
      password,
    );

    const user = userCredential.user;

    console.log('Login successful:', user.email);

    return serializeUser(user);
  } catch (error) {
    console.log('Login Error:', error);

    throw error;
  }
};

/*
   LOGOUT
*/

export const logoutUser = async () => {
  try {
    // Logout from Firebase
    await signOut(firebaseAuth);

    // Also clear Google Sign-In account if present
    try {
      await GoogleSignin.signOut();
    } catch (googleError) {
      // Ignore Google sign-out error for email/password users
      console.log('Google Sign-Out skipped:', googleError?.message);
    }

    console.log('Logout successful');

    return true;
  } catch (error) {
    console.log('Logout Error:', error);

    throw error;
  }
};

/*
   CURRENT USER
*/

export const getCurrentUser = () => {
  const user = firebaseAuth.currentUser;

  return serializeUser(user);
};

/*
   GET USER PROFILE
*/

export const getUserProfile = async uid => {
  try {
    if (!uid) {
      return null;
    }

    const userDoc = await getDoc(doc(db, 'Users', uid));

    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data();
  } catch (error) {
    console.log('Get User Error:', error);

    throw error;
  }
};
