import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Common/Header';
import PrimaryButton from '../../../components/Common/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';

import {
  Colors,
  FontSizes,
  Margin,
  Padding,
} from '../../../constants/globalStyle';

import ForgotPass from '../../../assets/ForgotPass.svg';
import { fonts } from '../../../constants/fonts';
import AppInput from '../../../components/Common/AppInput';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const handleSendResetCode = () => {
    if (!email.trim()) {
      console.log('Please enter email');
      return;
    }

    navigation.navigate('Verification', {
      email: email.trim(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Forgot Password" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            {/* Illustration */}
            <View style={styles.imageContainer}>
              <ForgotPass width={ms(120)} height={ms(120)} />
            </View>

            {/* Heading */}
            <Text style={styles.title}>Reset Password</Text>

            <Text style={styles.description}>
              Enter your email and we'll send a verification code to reset your
              password.
            </Text>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>

              <AppInput
                placeholder="you@company.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={
                  <Ionicons
                    name="mail-outline"
                    size={ms(19)}
                    color={Colors.textSecondary}
                  />
                }
              />
            </View>

            {/* Button */}
            <PrimaryButton
              title="Send Reset Code"
              style={styles.button}
              onPress={handleSendResetCode}
            />

            {/* Back to Login */}
            <TouchableOpacity
              style={styles.backContainer}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Login')}
            >
              <Ionicons
                name="arrow-back"
                size={ms(17)}
                color={Colors.primary}
              />

              <Text style={styles.backText}>Back to Sign In</Text>
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

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: Padding['4xl'],
  },

  content: {
    flex: 1,
    alignItems: 'center',

    paddingHorizontal: Padding.lg,
    paddingTop: Padding['2xl'],
  },

  /* Illustration */

  imageContainer: {
    width: ms(140),
    height: ms(140),

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: Margin.lg,
  },

  /* Heading */

  title: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.h1,

    color: Colors.textPrimary,

    textAlign: 'center',

    marginBottom: Margin.sm,
  },

  description: {
    width: '90%',

    fontFamily: fonts.regular,
    fontSize: FontSizes.bodyMd,
    lineHeight: ms(21),

    color: Colors.textSecondary,

    textAlign: 'center',

    marginBottom: Margin.xl,
  },

  /* Input */

  inputGroup: {
    width: '100%',
    marginTop: Margin.md,
  },

  label: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.labelMd,

    color: Colors.textSecondary,

    paddingBottom: Padding.sm,
  },

  /* Button */

  button: {
    width: '100%',
    marginTop: Margin.lg,
  },

  /* Back */

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
