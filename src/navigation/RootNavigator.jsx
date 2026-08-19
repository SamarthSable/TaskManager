import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SplashScreen from '../screens/Splash/SplashScreen';
import AuthStack from './AuthStack/AuthStack';
import StackNavigator from './MainStack/StackNavigator';

import CustomSnackBar from '../components/Common/CustomSnackBar';
import { hideSnackbar } from '../redux/slices/snackbarSlice';

import { subscribeToAuthChanges } from '../services/authServices';

export default function RootNavigator() {
  const dispatch = useDispatch();

  const snackbar = useSelector(state => state.snackbar);

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    console.log('Starting auth listener...');

    const unsubscribe = subscribeToAuthChanges(authUser => {
      console.log('Root auth user:', authUser);

      setUser(authUser);

      // Firebase has finished checking auth
      setCheckingAuth(false);
    });

    return () => {
      console.log('Removing auth listener');
      unsubscribe();
    };
  }, []);

  /*
   * ONLY SHOW SPLASH WHILE FIREBASE
   * IS CHECKING THE PERSISTED SESSION
   */
  if (checkingAuth) {
    return (
      <View style={{ flex: 1 }}>
        <SplashScreen />
      </View>
    );
  }

  /*
   * AUTHENTICATED USER
   */
  if (user) {
    return (
      <View style={{ flex: 1 }}>
        <StackNavigator />

        <CustomSnackBar
          visible={snackbar.visible}
          message={snackbar.message}
          type={snackbar.type}
          onDismiss={() => dispatch(hideSnackbar())}
        />
      </View>
    );
  }

  /*
   * NOT AUTHENTICATED
   */
  return (
    <View style={{ flex: 1 }}>
      <AuthStack />

      <CustomSnackBar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={() => dispatch(hideSnackbar())}
      />
    </View>
  );
}
