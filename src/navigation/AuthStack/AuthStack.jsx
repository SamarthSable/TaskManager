import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/Auth/login/loginScreen';
import SignUpScreen from '../../screens/Auth/register/SignupScreen';
import ForgotPassword from '../../screens/Auth/password/ForgotPassword';
import VerificationScreen from '../../screens/Auth/password/VerificationScreen';
import StackNavigator from '../MainStack/StackNavigator';
import BottomTabNavigator from '../../navigation/MainStack/BottomTabNavigator';
import ResetPasswordScreen from '../../screens/Auth/password/ResetPasswordScreen';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Main" component={StackNavigator} />
      <Stack.Screen name="ResetPass" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
