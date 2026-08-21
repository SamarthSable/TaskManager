import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Keyboard,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';

import Header from '../../../components/Common/Header';
import PrimaryButton from '../../../components/Common/PrimaryButton';
import AppInput from '../../../components/Common/AppInput';

import {
  Colors,
  FontSizes,
  Heights,
  LineHeights,
  Margin,
  Padding,
  Radius,
  Spacing,
  Widths,
} from '../../../constants/globalStyle';

import { fonts } from '../../../constants/fonts';

import { signupUser } from '../../../services/authServices';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';

export default function SignupScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      password,
      confirmPassword,
    } = formData;

    // Required fields
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !company.trim() ||
      !password ||
      !confirmPassword
    ) {
      dispatch(
        showSnackbar({
          message: 'Please fill all fields.',
          type: 'error',
        }),
      );

      return;
    }

    // Password match
    if (password !== confirmPassword) {
      dispatch(
        showSnackbar({
          message: 'Passwords do not match.',
          type: 'error',
        }),
      );

      return;
    }

    // Terms
    if (!agreed) {
      dispatch(
        showSnackbar({
          message: 'Please agree to the Terms of Service and Privacy Policy.',
          type: 'error',
        }),
      );

      return;
    }

    const signupData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company.trim(),
      password,
    };

    try {
      setLoading(true);

      await signupUser(signupData);

      dispatch(
        showSnackbar({
          message: 'Account created successfully.',
          type: 'success',
        }),
      );

      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        password: '',
        confirmPassword: '',
      });

      setAgreed(false);

      // Go to Login
      navigation.navigate('Login');
    } catch (error) {
      let message = 'Signup failed. Please try again.';

      switch (error?.code) {
        case 'auth/email-already-in-use':
          message = 'An account already exists with this email.';
          break;

        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;

        case 'auth/weak-password':
          message = 'Password is too weak.';
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

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Create Account" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Name */}

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>FIRST NAME</Text>

              <AppInput
                placeholder="Alex"
                value={formData.firstName}
                onChangeText={text => handleChange('firstName', text)}
                editable={!loading}
                leftIcon={
                  <Ionicons
                    name="person-outline"
                    size={ms(19)}
                    color={Colors.textSecondary}
                  />
                }
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>LAST NAME</Text>

              <AppInput
                placeholder="Chen"
                value={formData.lastName}
                onChangeText={text => handleChange('lastName', text)}
                editable={!loading}
                leftIcon={
                  <Ionicons
                    name="person-outline"
                    size={ms(19)}
                    color={Colors.textSecondary}
                  />
                }
              />
            </View>
          </View>

          {/* Email */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>

            <AppInput
              placeholder="you@company.com"
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              leftIcon={
                <Ionicons
                  name="mail-outline"
                  size={ms(19)}
                  color={Colors.textSecondary}
                />
              }
            />
          </View>

          {/* Phone */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PHONE</Text>

            <AppInput
              placeholder="+1 555 000 0000"
              value={formData.phone}
              onChangeText={text => handleChange('phone', text)}
              keyboardType="phone-pad"
              editable={!loading}
              leftIcon={
                <Ionicons
                  name="call-outline"
                  size={ms(19)}
                  color={Colors.textSecondary}
                />
              }
            />
          </View>

          {/* Company */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>COMPANY</Text>

            <AppInput
              placeholder="Acme Corp"
              value={formData.company}
              onChangeText={text => handleChange('company', text)}
              editable={!loading}
              leftIcon={
                <Ionicons
                  name="business-outline"
                  size={ms(19)}
                  color={Colors.textSecondary}
                />
              }
            />
          </View>

          {/* Password */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>

            <AppInput
              placeholder="••••••••"
              value={formData.password}
              onChangeText={text => handleChange('password', text)}
              secureTextEntry={!showPassword}
              editable={!loading}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={ms(19)}
                  color={Colors.textSecondary}
                />
              }
              rightIcon={
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={ms(21)}
                  color={Colors.textSecondary}
                />
              }
              onRightIconPress={() => setShowPassword(prev => !prev)}
            />
          </View>

          {/* Confirm Password */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONFIRM PASSWORD</Text>

            <AppInput
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChangeText={text => handleChange('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
              editable={!loading}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={ms(19)}
                  color={Colors.textSecondary}
                />
              }
              rightIcon={
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={ms(21)}
                  color={Colors.textSecondary}
                />
              }
              onRightIconPress={() => setShowConfirmPassword(prev => !prev)}
            />
          </View>

          {/* Terms */}

          <TouchableOpacity
            style={styles.termsContainer}
            activeOpacity={0.8}
            disabled={loading}
            onPress={() => setAgreed(prev => !prev)}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && (
                <Ionicons
                  name="checkmark"
                  size={ms(15)}
                  color={Colors.surface}
                />
              )}
            </View>

            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Create Account */}

          <PrimaryButton
            title={loading ? 'Creating Account...' : 'Create Account'}
            style={styles.createButton}
            onPress={() => {
              Keyboard.dismiss();
              handleSubmit();
            }}
            disabled={loading}
          />

          {/* Sign In */}

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>

            <TouchableOpacity
              disabled={loading}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: Padding['4xl'],
  },

  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Padding.lg,
    marginTop: Margin.lg,
  },

  halfInput: {
    flex: 1,
  },

  inputGroup: {
    paddingHorizontal: Padding.lg,
    marginTop: Margin.md,
  },

  label: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.labelMd,
    color: Colors.textSecondary,
    paddingBottom: Padding.sm,
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: Padding.lg,
    marginTop: Margin.lg,
  },

  checkbox: {
    width: Widths.iconSm,
    height: Heights.iconSm,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: Radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Margin.sm,
  },

  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  termsText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,
    color: Colors.textSecondary,
    lineHeight: LineHeights.labelLg,
  },

  termsLink: {
    fontFamily: fonts.semiBold,
    color: Colors.primary,
  },

  createButton: {
    marginHorizontal: Padding.lg,
    marginTop: Margin.xl,
  },

  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Margin.lg,
  },

  signInText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,
    color: Colors.textSecondary,
  },

  signInLink: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,
    color: Colors.primary,
    marginLeft: Margin.xs,
  },
});
