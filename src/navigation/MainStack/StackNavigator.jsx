import { View, Text } from 'react-native';
import React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import NewProjectScreen from '../../screens/Projects/NewProjectScreen';
import ProjectDetailScreen from '../../screens/Projects/ProjectDetailScreen';
import EditProjectScreen from '../../screens/Projects/EditProjectScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="NewProject" component={NewProjectScreen} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
      <Stack.Screen name="EditProject" component={EditProjectScreen} />
    </Stack.Navigator>
  );
}
