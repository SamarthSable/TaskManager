import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';

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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function VerificationScreen() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    // Only allow numbers
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

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      console.log('Please enter complete OTP');
      return;
    }

    console.log('OTP:', otpCode);
    navigation.navigate('ResetPass');
    // Verify OTP here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Verification" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* OTP Illustration */}
            <View style={styles.iconContainer}>
              <OtpIcon width={ms(120)} height={ms(120)} />
            </View>

            {/* Title */}
            <Text style={styles.title}>Enter OTP Code</Text>

            {/* Description */}
            <Text style={styles.description}>We sent a 6-digit code to</Text>

            <Text style={styles.email}>alex@taskflow.io</Text>

            {/* OTP Inputs */}
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
                  style={[styles.otpInput, value && styles.otpInputActive]}
                />
              ))}
            </View>

            {/* Verify */}
            <PrimaryButton
              title="Verify OTP"
              style={styles.verifyButton}
              onPress={handleVerify}
            />

            {/* Resend */}
            <Text style={styles.resendLabel}>Didn't receive code?</Text>

            <TouchableOpacity>
              <Text style={styles.resendText}>Resend in 0:45</Text>
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

  content: {
    flex: 1,
    alignItems: 'center',

    paddingHorizontal: Padding.lg,
    paddingTop: Padding['2xl'],
  },

  /* Icon */

  iconContainer: {
    width: ms(140),
    height: ms(140),

    borderRadius: Radius.full,

    backgroundColor: '#F3E8FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: Margin.lg,
  },

  /* Title */

  title: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.h3,

    color: Colors.textPrimary,

    textAlign: 'center',

    marginBottom: Margin.xs,
  },

  /* Description */

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
  },

  /* OTP */

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

  /* Button */

  verifyButton: {
    width: '100%',

    marginTop: Margin.lg,
  },

  /* Resend */

  resendLabel: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.caption,

    color: Colors.textSecondary,

    marginTop: Margin.lg,
  },

  resendText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.caption,

    color: Colors.primary,

    marginTop: Margin.xs,
  },
});
