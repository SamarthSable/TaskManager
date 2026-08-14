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

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const result = await GoogleSignin.signIn();

    console.log('Google result:', result);

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
