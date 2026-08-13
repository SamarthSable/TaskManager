import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ms, vs } from 'react-native-size-matters';

import AppInput from '../../../components/Common/AppInput';
import PrimaryButton from '../../../components/Common/PrimaryButton';
import Header from '../../../components/Common/Header';
import { fonts } from '../../../constants/fonts';
import {
  Colors,
  FontSizes,
  Spacing,
  Padding,
  Margin,
  Radius,
  BorderWidth,
  Widths,
} from '../../../constants/globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signupThunk } from '../../../redux/thunks/authThunks';
import { useDispatch, useSelector } from 'react-redux';
export default function SignupScreen() {
  const navigation = useNavigation();

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
  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.auth);
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
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
      Alert.alert('Please fill all fields');
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Terms
    if (!agreed) {
      Alert.alert('Please agree to Terms of Service and Privacy Policy');
      return;
    }

    // Data that will be sent to Firebase
    const signupData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      password,
    };

    console.log('Signup Data:', signupData);

    // Send data through Redux thunk
    dispatch(signupThunk(signupData))
      .unwrap()
      .then(user => {
        console.log('Signup successful:', user.uid);

        // Clear form only after successful signup
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          password: '',
          confirmPassword: '',
        });

        // Reset checkbox
        setAgreed(false);

        // Navigate to Login
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log('Signup failed:', error);

        Alert.alert('Signup Failed', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Create Account" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
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
            title="Create Account"
            style={styles.createButton}
            onPress={handleSubmit}
          />

          {/* Sign In */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
    backgroundColor: Colors.surface,
  },

  /* Content */

  scrollContent: {
    paddingHorizontal: Padding.lg,
    paddingTop: Padding.lg,
    paddingBottom: Padding['3xl'],
  },

  /* Two column row */

  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  halfInput: {
    flex: 1,
  },

  /* Inputs */

  inputGroup: {
    marginTop: Margin.sm,
  },

  label: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.labelMd,
    color: Colors.textSecondary,
    paddingBottom: Padding.sm,
  },

  /* Terms */

  termsContainer: {
    minHeight: vs(50),

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.md,
    paddingVertical: Padding.sm,

    marginTop: Margin.md,

    backgroundColor: Colors.backgroundSecondary,

    borderRadius: Radius.xl,
  },

  checkbox: {
    width: ms(20),
    height: ms(20),

    borderRadius: Radius.xs,

    borderWidth: BorderWidth.medium,
    borderColor: Colors.primary,

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
    lineHeight: ms(20),

    color: Colors.textSecondary,
  },

  termsLink: {
    fontFamily: fonts.semiBold,
    color: Colors.primary,
  },

  /* Button */

  createButton: {
    width: Widths.full,
  },

  /* Sign In */

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
