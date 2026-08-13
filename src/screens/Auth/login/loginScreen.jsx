import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ms, s, vs } from 'react-native-size-matters';

import {
  Colors,
  Spacing,
  Padding,
  Margin,
  FontSizes,
  Radius,
  Heights,
  BorderWidth,
  Shadows,
} from '../../../constants/globalStyle';

import AppInput from '../../../components/Common/AppInput';
import PrimaryButton from '../../../components/Common/PrimaryButton';

import Email from '../../../assets/Email.svg';
import Icon from '../../../assets/Icon.svg';
import Google from '../../../assets/Google.svg';
import Github from '../../../assets/Github.svg';
import Lock from '../../../assets/Lock.svg';

import { fonts } from '../../../constants/fonts';

import { loginThunk } from '../../../redux/thunks/authThunks';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email.trim()) {
      console.log('Please enter your email');
      return;
    }

    if (!password) {
      console.log('Please enter your password');
      return;
    }

    try {
      const user = await dispatch(
        loginThunk({
          email: email.trim(),
          password,
        }),
      ).unwrap();

      console.log('Login successful:', user);

      // Navigate after Firebase login succeeds
      navigation.replace('Home');
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#2563EB', '#7C3AED']}
          style={styles.iconContainer}
        >
          <Icon width={40} height={40} />
        </LinearGradient>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>

          <Text style={styles.subtitle}>Sign in to your TaskFlow account</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>

            <AppInput
              placeholder="alex@taskflow.io"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={<Email width={22} height={22} />}
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>

            <AppInput
              placeholder="••••••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon={<Lock width={22} height={22} />}
              rightIcon={
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color="#94A3B8"
                />
              }
              onRightIconPress={() => setShowPassword(prev => !prev)}
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgot}
            onPress={() => navigation.navigate('ForgotPass')}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Error
          {error ? <Text style={styles.errorText}>{error}</Text> : null} */}

          {/* Sign In */}
          <PrimaryButton
            title={loading ? 'Signing In...' : 'Sign In'}
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>

        {/* Divider */}
        <View style={styles.divideContainer}>
          <View style={styles.dividerLine} />

          <Text style={styles.orText}>or</Text>

          <View style={styles.dividerLine} />
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Google width={22} height={22} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Github width={22} height={22} />
            <Text style={styles.socialText}>Github</Text>
          </TouchableOpacity>
        </View>

        {/* Signup */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Padding.horizontalLg,
    paddingTop: Padding.verticalXl,
    paddingBottom: Padding.vertical3xl,
  },

  iconContainer: {
    width: s(64),
    height: vs(64),
    borderRadius: Radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
  },

  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Margin.xl,
  },

  title: {
    fontFamily: fonts.extraBold24,
    fontSize: FontSizes.h1,
    color: Colors.textPrimary,
  },

  subtitle: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodyMd,
    color: Colors.textSecondary,
  },

  formContainer: {
    width: '100%',
  },

  inputGroup: {
    marginBottom: Margin.xs,
  },

  label: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.labelLg,
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: Margin.sm,
  },

  forgot: {
    alignSelf: 'flex-end',
    paddingBottom: Padding.xs,
  },

  forgotText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,
    color: Colors.primary,
  },

  errorText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,
    color: Colors.error,
    marginBottom: Margin.sm,
  },

  button: {
    width: '100%',
  },

  divideContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Margin.xl,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },

  orText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,
    color: Colors.placeholder,
    marginHorizontal: Margin.md,
  },

  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: Spacing.md,
  },

  socialButton: {
    flex: 1,
    height: Heights.buttonSm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: BorderWidth.thin,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
  },

  socialText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodyMd,
    color: Colors.textPrimary,
  },

  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Margin.xl,
  },

  signupText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodyMd,
    color: Colors.textSecondary,
  },

  signupLink: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodyMd,
    color: Colors.primary,
    marginLeft: Margin.xs,
  },
});
