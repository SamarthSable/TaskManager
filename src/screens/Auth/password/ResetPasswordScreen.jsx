import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';

import Header from '../../../components/Common/Header';
import AppInput from '../../../components/Common/AppInput';
import PrimaryButton from '../../../components/Common/PrimaryButton';

import {
  Colors,
  FontSizes,
  Margin,
  Padding,
  Radius,
  Spacing,
} from '../../../constants/globalStyle';

import { fonts } from '../../../constants/fonts';

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /*
   * If you are passing the Firebase oobCode from
   * Verification screen:
   *
   * route.params?.oobCode
   */
  const oobCode = route.params?.oobCode;

  /* PASSWORD VALIDATION*/

  const passwordRules = useMemo(() => {
    return {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      numberOrSymbol: /[\d\W]/.test(password),
    };
  }, [password]);

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.uppercase &&
    passwordRules.numberOrSymbol &&
    passwordsMatch;

  /* .
     RESET PASSWORD
  . */

  const handleResetPassword = async () => {
    if (!password) {
      console.log('Please enter a new password');
      return;
    }

    if (!passwordRules.minLength) {
      console.log('Password must be at least 8 characters');
      return;
    }

    if (!passwordRules.uppercase) {
      console.log('Password must contain at least one uppercase letter');
      return;
    }

    if (!passwordRules.numberOrSymbol) {
      console.log('Password must contain at least one number or symbol');
      return;
    }

    if (!confirmPassword) {
      console.log('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    try {
      /*
       * Firebase password reset will go here.
       *
       * Example:
       *
       * await dispatch(
       *   resetPasswordThunk({
       *     oobCode,
       *     newPassword: password,
       *   }),
       * ).unwrap();
       */

      console.log('Password Reset:', {
        oobCode,
        password,
      });

      // After successful Firebase reset
      navigation.replace('Login');
    } catch (error) {
      console.log('Reset Password Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="New Password" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* .
              ICON
          . */}

          <View style={styles.iconContainer}>
            <Ionicons
              name="shield-outline"
              size={ms(42)}
              color={Colors.success}
            />
          </View>

          {/* .
              TITLE
          . */}

          <Text style={styles.title}>Create New Password</Text>

          <Text style={styles.description}>
            Must be different from previously used passwords
          </Text>

          {/* .
              NEW PASSWORD
          . */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>NEW PASSWORD</Text>

            <AppInput
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={ms(18)}
                  color={Colors.textSecondary}
                />
              }
              rightIcon={
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={ms(20)}
                  color={Colors.textSecondary}
                />
              }
              onRightIconPress={() => setShowPassword(prev => !prev)}
            />
          </View>

          {/* .
              CONFIRM PASSWORD
          . */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONFIRM PASSWORD</Text>

            <AppInput
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={ms(18)}
                  color={Colors.textSecondary}
                />
              }
              rightIcon={
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={ms(20)}
                  color={Colors.textSecondary}
                />
              }
              onRightIconPress={() => setShowConfirmPassword(prev => !prev)}
            />
          </View>

          {/* .
              PASSWORD RULES
          . */}

          <View style={styles.rulesContainer}>
            <PasswordRule
              valid={passwordRules.minLength}
              text="At least 8 characters"
            />

            <PasswordRule
              valid={passwordRules.uppercase}
              text="One uppercase letter"
            />

            <PasswordRule
              valid={passwordRules.numberOrSymbol}
              text="One number or symbol"
            />
          </View>

          {/* .
              PASSWORD MATCH
          . */}

          {confirmPassword.length > 0 && (
            <View style={styles.matchContainer}>
              <Ionicons
                name={passwordsMatch ? 'checkmark-circle' : 'close-circle'}
                size={ms(15)}
                color={passwordsMatch ? Colors.success : Colors.error}
              />

              <Text
                style={[
                  styles.matchText,
                  {
                    color: passwordsMatch ? Colors.success : Colors.error,
                  },
                ]}
              >
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </Text>
            </View>
          )}

          {/* .
              RESET BUTTON
          . */}

          <PrimaryButton
            title="Reset Password"
            style={styles.resetButton}
            onPress={handleResetPassword}
            disabled={!isPasswordValid}
          />

          {/* .
              BACK TO LOGIN
          . */}

          <TouchableOpacity
            style={styles.backContainer}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Login')}
          >
            <Ionicons name="arrow-back" size={ms(17)} color={Colors.primary} />

            <Text style={styles.backText}>Back to Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ..===
   PASSWORD RULE COMPONENT
..=== */

const PasswordRule = ({ valid, text }) => {
  return (
    <View style={styles.ruleRow}>
      <Ionicons
        name={valid ? 'checkmark-circle' : 'ellipse-outline'}
        size={ms(14)}
        color={valid ? Colors.success : Colors.textSecondary}
      />

      <Text style={[styles.ruleText, valid && styles.ruleTextValid]}>
        {text}
      </Text>
    </View>
  );
};

/* ..===
   STYLES
..=== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,

    alignItems: 'center',

    paddingHorizontal: Padding.horizontalLg,
    paddingTop: Padding.xl,
    paddingBottom: Padding.vertical3xl,
  },

  /* .
     ICON
  . */

  iconContainer: {
    width: ms(70),
    height: ms(70),

    borderRadius: ms(35),

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#DCFCE7',

    marginBottom: Margin.md,
  },

  /* .
     TITLE
  . */

  title: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.h2,
    color: Colors.textPrimary,

    textAlign: 'center',

    marginBottom: Margin.xs,
  },

  description: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,
    color: Colors.textSecondary,

    textAlign: 'center',

    marginBottom: Margin.lg,
  },

  /* .
     INPUT
  . */

  inputGroup: {
    width: '100%',

    marginBottom: Margin.md,
  },

  label: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.labelSm,

    color: Colors.textSecondary,

    marginBottom: Padding.xs,
  },

  /* .
     RULES
  . */

  rulesContainer: {
    width: '100%',

    backgroundColor: Colors.inputBackground,

    borderRadius: Radius.lg,

    paddingHorizontal: Padding.md,
    paddingVertical: Padding.sm,

    marginTop: Margin.xs,
  },

  ruleRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginVertical: ms(2),
  },

  ruleText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodyXs,

    color: Colors.textSecondary,

    marginLeft: Spacing.xs,
  },

  ruleTextValid: {
    color: Colors.success,
  },

  /* .
     PASSWORD MATCH
  . */

  matchContainer: {
    width: '100%',

    flexDirection: 'row',

    alignItems: 'center',

    marginTop: Margin.xs,
  },

  matchText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodyXs,

    marginLeft: Spacing.xs,
  },

  /* .
     BUTTON
  . */

  resetButton: {
    width: '100%',

    marginTop: Margin.lg,
  },

  /* BACK */

  backContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: Margin.lg,
  },

  backText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.primary,

    marginLeft: Margin.xs,
  },
});
