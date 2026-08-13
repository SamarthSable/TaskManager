import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import AuthStack from './AuthStack/AuthStack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
}
