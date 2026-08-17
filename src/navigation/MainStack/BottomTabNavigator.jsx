import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Team, Task, Folder } from '../../assets/svgs';
import HomeScreen from '../../screens/Home/HomeScreen';
import ProjectScreen from '../../screens/Projects/Projects';
import { Colors, Padding } from '../../constants/globalStyle';
const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',

          height: 65,
          padding: 8,
          backgroundColor: Colors.surface,
        },
        tabBarActiveTintColor: Colors.active,
        tabBarInactiveTintColor: Colors.inactive,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Home
              color={focused ? Colors.active : Colors.inactive}
              height={16}
              width={16}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Projects"
        component={ProjectScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Folder
              color={focused ? Colors.active : Colors.inactive}
              height={16}
              width={16}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Task"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Task
              color={focused ? Colors.active : Colors.inactive}
              height={16}
              width={16}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Team"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Team
              color={focused ? Colors.active : Colors.inactive}
              height={16}
              width={16}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Profile
              color={focused ? Colors.active : Colors.inactive}
              height={16}
              width={16}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
