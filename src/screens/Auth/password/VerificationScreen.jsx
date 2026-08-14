import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ms, vs } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../components/Common/Header';
import PrimaryButton from '../../../components/Common/PrimaryButton';

import {
  Colors,
  FontSizes,
  Margin,
  Padding,
  Radius,
} from '../../../constants/globalStyle';

import { fonts } from '../../../constants/fonts';

import OtpIcon from '../../../assets/OtpIcon.svg';

import { sendOtpThunk, verifyOtpThunk } from '../../../redux/thunks/authThunks';

export default function VerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  /* =========================================
     EMAIL
  ========================================= */

  const email = route.params?.email || '';

  /* =========================================
     OTP
  ========================================= */

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const inputRefs = useRef([]);

  /* =========================================
     RESEND TIMER
  ========================================= */

  const [countdown, setCountdown] = useState(45);

  /* =========================================
     REDUX
  ========================================= */

  const { resetLoading, error, otpVerified } = useSelector(state => state.auth);

  /* =========================================
     COUNTDOWN
  ========================================= */

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  /* =========================================
     FORMAT TIMER
  ========================================= */

  const formattedCountdown = `0:${countdown.toString().padStart(2, '0')}`;

  /* =========================================
     OTP CHANGE
  ========================================= */

  const handleOtpChange = (value, index) => {
    // Only numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* =========================================
     BACKSPACE
  ========================================= */

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* =========================================
     VERIFY OTP
  ========================================= */

  const handleVerify = async () => {
    const otpCode = otp.join('');

    console.log('OTP ARRAY:', otp);
    console.log('OTP CODE:', otpCode);
    console.log('EMAIL:', email);

    if (otpCode.length !== 6) {
      console.log('Please enter complete OTP');
      return;
    }

    if (!email) {
      console.log('Email not found');
      return;
    }

    try {
      await dispatch(
        verifyOtpThunk({
          email,
          otp: otpCode,
        }),
      ).unwrap();

      console.log('OTP verified successfully');

      navigation.navigate('ResetPass', {
        email,
      });
    } catch (error) {
      console.log('OTP Verification Error:', error);
    }
  };

  /* =========================================
     RESEND OTP
  ========================================= */

  const handleResend = async () => {
    if (countdown > 0 || resetLoading) {
      return;
    }

    if (!email) {
      console.log('Email not found');
      return;
    }

    try {
      await dispatch(
        sendOtpThunk({
          email,
        }),
      ).unwrap();

      console.log('OTP resent successfully');

      // Clear previous OTP
      setOtp(['', '', '', '', '', '']);

      // Start timer again
      setCountdown(45);

      // Focus first input
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.log('Resend OTP Error:', error);
    }
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Verification" />

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
            {/* =====================================
                ICON
            ===================================== */}

            <View style={styles.iconContainer}>
              <OtpIcon width={ms(120)} height={ms(120)} />
            </View>

            {/* =====================================
                TITLE
            ===================================== */}

            <Text style={styles.title}>Enter OTP Code</Text>

            {/* =====================================
                DESCRIPTION
            ===================================== */}

            <Text style={styles.description}>We sent a 6-digit code to</Text>

            <Text style={styles.email}>{email}</Text>

            {/* =====================================
                OTP INPUTS
            ===================================== */}

            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputRefs.current[index] = ref;
                  }}
                  value={value}
                  onChangeText={text => handleOtpChange(text, index)}
                  onKeyPress={event => handleKeyPress(event, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  selectionColor={Colors.primary}
                  editable={!resetLoading}
                  style={[styles.otpInput, value && styles.otpInputActive]}
                />
              ))}
            </View>

            {/* =====================================
                ERROR
            ===================================== */}

            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* =====================================
                VERIFY
            ===================================== */}

            <PrimaryButton
              title={resetLoading ? 'Verifying...' : 'Verify OTP'}
              style={styles.verifyButton}
              onPress={handleVerify}
              disabled={resetLoading}
            />

            {/* =====================================
                RESEND
            ===================================== */}

            <Text style={styles.resendLabel}>Didn't receive code?</Text>

            {countdown > 0 ? (
              <Text style={styles.resendTimer}>
                Resend in {formattedCountdown}
              </Text>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={resetLoading}
                onPress={handleResend}
              >
                <Text style={styles.resendText}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* =========================================
   STYLES
========================================= */

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

  /* =========================================
     ICON
  ========================================= */

  iconContainer: {
    width: ms(140),
    height: ms(140),

    borderRadius: Radius.full,

    backgroundColor: '#F3E8FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: Margin.lg,
  },

  /* =========================================
     TITLE
  ========================================= */

  title: {
    fontFamily: fonts.bold,

    fontSize: FontSizes.h3,

    color: Colors.textPrimary,

    textAlign: 'center',

    marginBottom: Margin.xs,
  },

  /* =========================================
     DESCRIPTION
  ========================================= */

  description: {
    fontFamily: fonts.regular,

    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,

    textAlign: 'center',

    marginTop: Margin.xs,
  },

  email: {
    fontFamily: fonts.semiBold,

    fontSize: FontSizes.bodySm,

    color: Colors.primary,

    marginTop: Margin.xs,

    maxWidth: '90%',
  },

  /* =========================================
     OTP
  ========================================= */

  otpContainer: {
    width: '100%',

    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: Margin.lg,
  },

  otpInput: {
    width: ms(42),

    height: vs(42),

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: Radius.lg,

    backgroundColor: Colors.surface,

    fontFamily: fonts.semiBold,

    fontSize: FontSizes.h3,

    color: Colors.textPrimary,

    textAlign: 'center',
  },

  otpInputActive: {
    borderColor: Colors.primary,

    borderWidth: 1.5,
  },

  /* =========================================
     ERROR
  ========================================= */

  errorText: {
    width: '100%',

    fontFamily: fonts.regular,

    fontSize: FontSizes.bodySm,

    color: '#EF4444',

    textAlign: 'center',

    marginTop: Margin.sm,
  },

  /* =========================================
     BUTTON
  ========================================= */

  verifyButton: {
    width: '100%',

    marginTop: Margin.lg,
  },

  /* =========================================
     RESEND
  ========================================= */

  resendLabel: {
    fontFamily: fonts.regular,

    fontSize: FontSizes.caption,

    color: Colors.textSecondary,

    marginTop: Margin.lg,
  },

  resendTimer: {
    fontFamily: fonts.semiBold,

    fontSize: FontSizes.caption,

    color: Colors.textSecondary,

    marginTop: Margin.xs,
  },

  resendText: {
    fontFamily: fonts.semiBold,

    fontSize: FontSizes.caption,

    color: Colors.primary,

    marginTop: Margin.xs,
  },
});
