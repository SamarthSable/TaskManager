import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { logoutThunk } from '../../redux/thunks/authThunks';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();

      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Auth' }],
      // });
      // navigation.navigate('Login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
