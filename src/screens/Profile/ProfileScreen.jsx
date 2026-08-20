import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { logoutUser } from '../../services/authServices';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { useDispatch } from 'react-redux';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logoutUser();

      // Firebase auth listener in RootNavigator
      // will automatically detect logout and show AuthStack.
      // navigation.navigate('Login');
      dispatch(
        showSnackbar({
          message: 'Logout Successful.',
          type: 'success',
        }),
      );
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    marginBottom: 30,
  },

  logoutButton: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#2260FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
