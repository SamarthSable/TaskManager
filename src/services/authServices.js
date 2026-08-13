import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

import { doc, setDoc, getDoc } from '@react-native-firebase/firestore';

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
   SIGN UP
 */

export const signupUser = async userData => {
  const { firstName, lastName, email, password, phone, company } = userData;

  try {
    // Create Firebase Authentication user
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email.trim(),
      password,
    );

    const user = userCredential.user;

    // Store user information in Firestore
    await setDoc(doc(db, 'Users', user.uid), {
      uid: user.uid,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      createdAt: new Date().toISOString(),
    });

    // IMPORTANT:
    // Return a plain object, NOT Firebase User
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

    // Return serializable object
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
    await signOut(firebaseAuth);

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
  return serializeUser(firebaseAuth.currentUser);
};

/* 
   GET USER PROFILE
 */

export const getUserProfile = async uid => {
  try {
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
