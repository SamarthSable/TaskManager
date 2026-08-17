import { View, Text } from 'react-native';
import React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import NewProjectScreen from '../../screens/Projects/NewProjectScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="NewProject" component={NewProjectScreen} />
    </Stack.Navigator>
  );
}
