// import React, { useEffect, useState } from 'react';
// import { StatusBar, Text, useColorScheme, View } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   collection,
// } from '@react-native-firebase/firestore';
// import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
// import SplashScreen from './src/screens/Splash/SplashScreen';
// import LoginScreen from './src/screens/Auth/login/loginScreen';
// const db = getFirestore();

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   // const [user, setUser] = useState(null);

//   // useEffect(() => {
//   //   const getUser = async () => {
//   //     try {
//   //       const userDoc = await getDoc(doc(db, 'Users', 'rzjB9mLA4q33QhvwYccn'));

//   //       if (userDoc.exists()) {
//   //         console.log('User:', userDoc.data());

//   //         setUser(userDoc.data());
//   //       } else {
//   //         console.log('User not found');
//   //       }
//   //     } catch (error) {
//   //       console.log('Firestore error:', error);
//   //     }
//   //   };

//   //   getUser();
//   //   const newuser = { Name: 'NIkhil', age: 36 };

//   //   const addUser = async () => {
//   //     const newUserRef = doc(collection(db, 'Users'));
//   //     await setDoc(newUserRef, newuser);
//   //   };
//   //   addUser();
//   // }, []);

//   return (
//     <SafeAreaProvider>
//       {/* <SafeAreaView style={{ flex: 1 }}> */}
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

//       {/* <View>
//           <Text>Welcome</Text>

//           {user && (
//             <>
//               <Text>Name: {user.Name}</Text>
//               <Text>Age: {user.age}</Text>
//             </>
//           )}
//         </View> */}
//       {/* <SplashScreen /> */}
//       <LoginScreen />
//       {/* </SafeAreaView> */}
//       {/* <OnboardingScreen /> */}
//     </SafeAreaProvider>
//   );
// }

// export default App;
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
