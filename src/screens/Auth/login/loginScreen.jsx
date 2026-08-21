import React, { useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { ms, s, vs } from 'react-native-size-matters';

import {
  Colors,
  FontSizes,
  Padding,
  Radius,
  Heights,
  BorderWidth,
  Shadows,
  Widths,
  Margin,
  Spacing,
} from '../../../constants/globalStyle';

import AppInput from '../../../components/Common/AppInput';
import PrimaryButton from '../../../components/Common/PrimaryButton';

import { Email, Icon, Google, Github, Lock } from '../../../assets/svgs';
import { fonts } from '../../../constants/fonts';

import { loginUser } from '../../../services/authServices';
import { signInWithGoogle } from '../../../services/googleAuthService';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  /*
   * EMAIL / PASSWORD LOGIN
   */

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      dispatch(
        showSnackbar({
          message: 'Please enter email and password.',
          type: 'error',
        }),
      );
      return;
    }

    if (loading || googleLoading) {
      return;
    }

    try {
      setLoading(true);

      await loginUser(email.trim(), password);

      dispatch(
        showSnackbar({
          message: 'Login Successful.',
          type: 'success',
        }),
      );
    } catch (error) {
      let message = 'Login failed. Please try again.';

      switch (error?.code) {
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;

        case 'auth/user-not-found':
          message = 'No account found with this email.';
          break;

        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          message = 'Invalid email or password.';
          break;

        case 'auth/user-disabled':
          message = 'This account has been disabled.';
          break;

        case 'auth/too-many-requests':
          message = 'Too many attempts. Please try again later.';
          break;

        case 'auth/network-request-failed':
          message = 'Network error. Please check your internet connection.';
          break;

        default:
          message = error?.message || message;
      }

      dispatch(
        showSnackbar({
          message,
          type: 'error',
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * GOOGLE LOGIN
   */

  const handleGoogleLogin = async () => {
    if (googleLoading || loading) {
      return;
    }

    try {
      setGoogleLoading(true);

      await signInWithGoogle();

      dispatch(
        showSnackbar({
          message: 'Login Successful.',
          type: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.message || 'Google login failed.',
          type: 'error',
        }),
      );
    } finally {
      setGoogleLoading(false);
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
                  color={Colors.placeholder}
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

          {/* Sign In */}

          <PrimaryButton
            title={loading ? 'Signing In...' : 'Sign In'}
            style={styles.button}
            onPress={() => {
              Keyboard.dismiss();
              handleLogin();
            }}
            disabled={loading || googleLoading}
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
          {/* Google */}

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => {
              Keyboard.dismiss();
              handleGoogleLogin();
            }}
            disabled={googleLoading || loading}
          >
            <Google width={22} height={22} />

            <Text style={styles.socialText}>
              {googleLoading ? 'Signing In...' : 'Google'}
            </Text>
          </TouchableOpacity>

          {/* Github */}

          <TouchableOpacity
            style={styles.socialButton}
            disabled={loading || googleLoading}
          >
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
    backgroundColor: Colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Padding.horizontalLg,
    paddingTop: Padding.verticalXl,
    paddingBottom: Padding.vertical3xl,
  },

  iconContainer: {
    width: Widths.icon3xl,
    height: Heights.icon3xl,
    borderRadius: Radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
  },

  header: {
    width: Widths.full,
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
    width: Widths.full,
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
    width: Widths.full,
  },

  divideContainer: {
    width: Widths.full,
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
    width: Widths.full,
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
    backgroundColor: Colors.background,
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
