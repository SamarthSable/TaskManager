import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import AppInput from '../../../components/Common/AppInput';
import Email from '../../../assets/Email.svg';
import Icon from '../../../assets/Icon.svg';
import Google from '../../../assets/Google.svg';
import Github from '../../../assets/Github.svg';
import Lock from '../../../assets/Lock.svg';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryButton from '../../../components/Common/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../../constants/fonts';
export default function loginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#2563EB', '#7C3AED']}
        style={styles.iconContainer}
      >
        <Icon width={50} height={50} />
      </LinearGradient>
      <Text style={styles.title}>Welcome back</Text>
      <Text>Sign in to your TaskFlow account</Text>
      <View>
        <Text>EMAIL</Text>
        <AppInput
          placeholder={'alex@taskflow.io'}
          leftIcon={<Email width={25} height={25} />}
        />
      </View>
      <View>
        <Text>PASSWORD</Text>
        <AppInput
          placeholder={'* * * * * * * * * * *'}
          leftIcon={<Lock width={25} height={25} />}
          rightIcon={
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color={'#a8a8a9'}
            />
          }
          secureTextEntry={!showPassword}
          onRightIconPress={() => setShowPassword(prev => !prev)}
        />
      </View>
      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot password</Text>
      </TouchableOpacity>
      <PrimaryButton title={'Sign In'} style={styles.button} />
      <View style={styles.divideContainer}>
        <View style={styles.dividerLine}></View>
        <Text>or</Text>
        <View style={styles.dividerLine}></View>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialIcon}>
          <Google width={25} height={25} />
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Github width={25} height={25} />
          <Text>Github</Text>
        </TouchableOpacity>
      </View>
      <Text>Don't hvae an account? Create Account</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: { fontFamily: fonts.extraBold24, fontSize: 28 },
  button: {
    width: '100%',
  },
  forgotText: {
    color: '#2260ff',
  },
  forgot: {
    alignSelf: 'flex-end',
  },
  iconContainer: {
    marginVertical: 10,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    boxShadow: '0px 24px 24px -2px rgba(145, 191, 237, 0.8)',
  },
  divideContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  dividerLine: {
    height: 2,
    backgroundColor: '#E2E8F0',
    width: 150,
  },
  socialContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  socialIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    padding: 12,
    gap: 10,
  },
});
