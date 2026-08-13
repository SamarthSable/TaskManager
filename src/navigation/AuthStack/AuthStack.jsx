import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/Auth/login/loginScreen';
import SignUpScreen from '../../screens/Auth/register/SignupScreen';
import ForgotPassword from '../../screens/Auth/password/ForgotPassword';
import VerificationScreen from '../../screens/Auth/password/VerificationScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import ResetPasswordScreen from '../../screens/Auth/password/ResetPasswordScreen';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ResetPass" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
