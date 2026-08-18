import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';

import { doc, setDoc, getDoc } from '@react-native-firebase/firestore';

import { db } from '../config/firebase';

GoogleSignin.configure({
  webClientId:
    '1065033268256-1f5enbfo2kbd6rfj98c5prj2cj7go1p8.apps.googleusercontent.com',
});

const auth = getAuth();

/*
   GOOGLE SIGN IN
*/

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    /*
       Clear previously selected Google account
       so the account picker appears.
    */

    await GoogleSignin.signOut();

    const result = await GoogleSignin.signIn();

    console.log('Google Sign-In result:', result);

    const idToken = result.data?.idToken;

    if (!idToken) {
      throw new Error('Google ID token not found');
    }

    /*
       Create Firebase credential
    */

    const credential = GoogleAuthProvider.credential(idToken);

    /*
       Firebase automatically:
       - creates Firebase user on first login
       - signs in existing user on later login
    */

    const userCredential = await signInWithCredential(auth, credential);

    const user = userCredential.user;

    console.log('Firebase Google login successful');
    console.log('UID:', user.uid);
    console.log('Email:', user.email);

    /*
       CHECK FIRESTORE USER
    */

    const userRef = doc(db, 'Users', user.uid);

    const userDoc = await getDoc(userRef);

    /*
       CREATE PROFILE ONLY ON FIRST LOGIN
    */

    if (!userDoc.exists()) {
      const displayName = user.displayName || '';

      const nameParts = displayName.trim().split(/\s+/);

      const firstName = nameParts[0] || '';

      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      await setDoc(userRef, {
        uid: user.uid,
        firstName,
        lastName,
        email: user.email || '',
        phone: user.phoneNumber || '',
        company: '',
        createdAt: new Date().toISOString(),
      });

      console.log('Google user profile created in Firestore');
    } else {
      console.log('Google user profile already exists');
    }

    /*
       Return Firebase user
    */

    return user;
  } catch (error) {
    console.log('Google Sign-In Error:', error);

    throw error;
  }
};
