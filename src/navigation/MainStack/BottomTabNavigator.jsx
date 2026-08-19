import { View, Text, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Team, Task, Folder } from '../../assets/svgs';
import HomeScreen from '../../screens/Home/HomeScreen';
import ProjectScreen from '../../screens/Projects/Projects';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import { Colors, Padding } from '../../constants/globalStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: Platform.OS === 'android' ? 60 + insets.bottom : 60,
          paddingTop: 5,
          // height: 65,
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
              height={26}
              width={26}
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
              height={24}
              width={24}
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
              height={24}
              width={24}
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
              height={24}
              width={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Profile
              color={focused ? Colors.active : Colors.inactive}
              height={24}
              width={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
// import { View, Text } from 'react-native';
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Home, Profile, Team, Task, Folder } from '../../assets/svgs';
// import HomeScreen from '../../screens/Home/HomeScreen';
// import ProjectScreen from '../../screens/Projects/Projects';
// import ProfileScreen from '../../screens/Profile/ProfileScreen';
// import { Colors, Padding } from '../../constants/globalStyle';
// const Tab = createBottomTabNavigator();
// export default function BottomTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           position: 'absolute',

//           // height: 65,
//           // padding: 8,
//           backgroundColor: Colors.surface,
//         },
//         tabBarActiveTintColor: Colors.active,
//         tabBarInactiveTintColor: Colors.inactive,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Home
//               color={focused ? Colors.active : Colors.inactive}
//               height={16}
//               width={16}
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Projects"
//         component={ProjectScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Folder
//               color={focused ? Colors.active : Colors.inactive}
//               height={16}
//               width={16}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Task"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Task
//               color={focused ? Colors.active : Colors.inactive}
//               height={16}
//               width={16}
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Team"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Team
//               color={focused ? Colors.active : Colors.inactive}
//               height={16}
//               width={16}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Profile
//               color={focused ? Colors.active : Colors.inactive}
//               height={16}
//               width={16}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
