import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '1065033268256-1f5enbfo2kbd6rfj98c5prj2cj7go1p8.apps.googleusercontent.com',
});

// export const signInWithGoogle = async () => {
//   try {
//     await GoogleSignin.hasPlayServices({
//       showPlayServicesUpdateDialog: true,
//     });

//     const result = await GoogleSignin.signIn();

//     console.log('Google result:', result);

//     const idToken = result.data?.idToken;

//     if (!idToken) {
//       throw new Error('Google ID token not found');
//     }

//     const credential = GoogleAuthProvider.credential(idToken);

//     const userCredential = await signInWithCredential(getAuth(), credential);

//     return userCredential.user;
//   } catch (error) {
//     console.log('Google Sign-In Error:', error);
//     throw error;
//   }
// };
// export const signInWithGoogle = async () => {
//   try {
//     console.log('1. Checking Play Services');

//     await GoogleSignin.hasPlayServices({
//       showPlayServicesUpdateDialog: true,
//     });

//     console.log('2. Play Services OK');
//     console.log('3. Starting Google Sign-In');

//     const result = await GoogleSignin.signIn();

//     console.log('4. Google Sign-In result:', result);

//     const idToken = result.data?.idToken;

//     console.log('5. ID token exists:', !!idToken);

//     if (!idToken) {
//       throw new Error('Google ID token not found');
//     }

//     console.log('6. Creating Firebase credential');

//     const credential = GoogleAuthProvider.credential(idToken);

//     console.log('7. Signing into Firebase');

//     const userCredential = await signInWithCredential(getAuth(), credential);

//     console.log('8. Firebase login successful');

//     return userCredential.user;
//   } catch (error) {
//     console.log('GOOGLE ERROR CODE:', error?.code);
//     console.log('GOOGLE ERROR MESSAGE:', error?.message);
//     console.log('GOOGLE ERROR:', error);

//     throw error;
//   }
// };
export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    // Clear previously selected Google account
    await GoogleSignin.signOut();

    const result = await GoogleSignin.signIn();

    console.log('Google Sign-In result:', result);

    const idToken = result.data?.idToken;

    if (!idToken) {
      throw new Error('Google ID token not found');
    }

    const credential = GoogleAuthProvider.credential(idToken);

    const userCredential = await signInWithCredential(getAuth(), credential);

    return userCredential.user;
  } catch (error) {
    console.log('Google Sign-In Error:', error);
    throw error;
  }
};
