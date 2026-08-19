// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   View,
// } from 'react-native';
// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../../components/Common/Header';
// import PrimaryButton from '../../../components/Common/PrimaryButton';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { ms } from 'react-native-size-matters';

// import {
//   Colors,
//   FontSizes,
//   Margin,
//   Padding,
// } from '../../../constants/globalStyle';

// import ForgotPass from '../../../assets/ForgotPass.svg';
// import { fonts } from '../../../constants/fonts';
// import AppInput from '../../../components/Common/AppInput';

// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';

// import { sendOtpThunk } from '../../../redux/thunks/authThunks';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');

//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const { loading, error } = useSelector(state => state.auth);

//   const handleSendResetCode = async () => {
//     const trimmedEmail = email.trim().toLowerCase();

//     // Email required
//     if (!trimmedEmail) {
//       console.log('Please enter your email');
//       return;
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(trimmedEmail)) {
//       console.log('Please enter a valid email address');
//       return;
//     }

//     try {
//       const result = await dispatch(
//         sendOtpThunk({
//           email: trimmedEmail,
//         }),
//       ).unwrap();

//       console.log('OTP sent successfully');

//       /*
//        * OTP is now stored in authSlice:
//        *
//        * auth.otpEmail
//        * auth.otp
//        * auth.otpExpiresAt
//        * auth.otpVerified
//        */

//       navigation.navigate('Verification', {
//         email: trimmedEmail,
//       });
//     } catch (error) {
//       console.log('Send OTP Error:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Forgot Password" />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardContainer}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* Content */}
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps="handled"
//             contentContainerStyle={styles.content}
//           >
//             {/* Illustration */}
//             <View style={styles.imageContainer}>
//               <ForgotPass width={ms(120)} height={ms(120)} />
//             </View>

//             {/* Heading */}
//             <Text style={styles.title}>Reset Password</Text>

//             <Text style={styles.description}>
//               Enter your email and we'll send a verification code to reset your
//               password.
//             </Text>

//             {/* Email */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>EMAIL</Text>

//               <AppInput
//                 placeholder="you@company.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 editable={!loading}
//                 leftIcon={
//                   <Ionicons
//                     name="mail-outline"
//                     size={ms(19)}
//                     color={Colors.textSecondary}
//                   />
//                 }
//               />
//             </View>

//             {/* Error */}
//             {error && <Text style={styles.errorText}>{error}</Text>}

//             {/* Send OTP */}
//             <PrimaryButton
//               title={loading ? 'Sending...' : 'Send Reset Code'}
//               style={styles.button}
//               onPress={handleSendResetCode}
//               disabled={loading}
//             />

//             {/* Back to Login */}
//             <TouchableOpacity
//               style={styles.backContainer}
//               activeOpacity={0.7}
//               disabled={loading}
//               onPress={() => navigation.navigate('Login')}
//             >
//               <Ionicons
//                 name="arrow-back"
//                 size={ms(17)}
//                 color={Colors.primary}
//               />

//               <Text style={styles.backText}>Back to Sign In</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.surface,
//   },

//   keyboardContainer: {
//     flex: 1,
//   },

//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: Padding['4xl'],
//   },

//   content: {
//     flexGrow: 1,
//     alignItems: 'center',

//     paddingHorizontal: Padding.lg,
//     paddingTop: Padding['2xl'],
//   },

//   /*
//      ILLUSTRATION
//    */

//   imageContainer: {
//     width: ms(140),
//     height: ms(140),

//     alignItems: 'center',
//     justifyContent: 'center',

//     marginBottom: Margin.lg,
//   },

//   /*
//      HEADING
//    */

//   title: {
//     fontFamily: fonts.bold,
//     fontSize: FontSizes.h1,

//     color: Colors.textPrimary,

//     textAlign: 'center',

//     marginBottom: Margin.sm,
//   },

//   description: {
//     width: '90%',

//     fontFamily: fonts.regular,
//     fontSize: FontSizes.bodyMd,
//     lineHeight: ms(21),

//     color: Colors.textSecondary,

//     textAlign: 'center',

//     marginBottom: Margin.xl,
//   },

//   /*
//      INPUT
//    */

//   inputGroup: {
//     width: '100%',
//     marginTop: Margin.md,
//   },

//   label: {
//     fontFamily: fonts.semiBold,
//     fontSize: FontSizes.labelMd,

//     color: Colors.textSecondary,

//     paddingBottom: Padding.sm,
//   },

//   /*
//      ERROR
//    */

//   errorText: {
//     width: '100%',

//     fontFamily: fonts.regular,
//     fontSize: FontSizes.bodySm,

//     color: '#EF4444',

//     marginTop: Margin.sm,
//   },

//   /*
//      BUTTON
//    */

//   button: {
//     width: '100%',

//     marginTop: Margin.lg,
//   },

//   /*
//      BACK
//    */

//   backContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',

//     marginTop: Margin.lg,
//   },

//   backText: {
//     fontFamily: fonts.semiBold,
//     fontSize: FontSizes.bodySm,

//     color: Colors.primary,

//     marginLeft: Margin.xs,
//   },
// });
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Common/Header';
import PrimaryButton from '../../../components/Common/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import {
  Colors,
  FontSizes,
  Margin,
  Padding,
} from '../../../constants/globalStyle';

import { ForgotPass } from '../../../assets/svgs';
import { fonts } from '../../../constants/fonts';
import AppInput from '../../../components/Common/AppInput';

import { getAuth } from '@react-native-firebase/auth';

import { showSnackbar } from '../../../redux/slices/snackbarSlice';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  /*
   * SEND PASSWORD RESET EMAIL
   */

  const handleSendResetEmail = async () => {
    const cleanEmail = email.trim().toLowerCase();

    /*
     * VALIDATION
     */

    if (!cleanEmail) {
      dispatch(
        showSnackbar({
          message: 'Please enter your email address.',
          type: 'error',
        }),
      );
      return;
    }

    setLoading(true);

    try {
      /*
       * Firebase directly sends the
       * password reset email.
       */

      await getAuth().sendPasswordResetEmail(cleanEmail);

      /*
       * SUCCESS
       */

      dispatch(
        showSnackbar({
          message: 'Password reset link sent successfully.',
          type: 'success',
        }),
      );

      /*
       * Go back to Login.
       */

      navigation.navigate('Login');
    } catch (error) {
      /*
       * FIREBASE ERROR HANDLING
       */

      let message = 'Failed to send reset email.';

      switch (error?.code) {
        case 'auth/user-not-found':
          message = 'No registered account found with this email.';
          break;

        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;

        case 'auth/too-many-requests':
          message = 'Too many requests. Please try again later.';
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
            {/* 
                ILLUSTRATION
             */}

            <View style={styles.imageContainer}>
              <ForgotPass width={ms(120)} height={ms(120)} />
            </View>

            {/* 
                HEADING
             */}

            <Text style={styles.title}>Reset Password</Text>

            <Text style={styles.description}>
              Enter your email and we'll send you a password reset link to reset
              your password.
            </Text>

            {/* 
                EMAIL INPUT
             */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>

              <AppInput
                placeholder="you@company.com"
                value={email}
                onChangeText={setEmail}
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

            {/* 
                SEND RESET LINK
             */}

            <PrimaryButton
              title={loading ? 'Sending...' : 'Send Reset Link'}
              style={styles.button}
              onPress={handleSendResetEmail}
              disabled={loading}
            />

            {/* 
                BACK TO LOGIN
             */}

            <TouchableOpacity
              style={styles.backContainer}
              activeOpacity={0.7}
              disabled={loading}
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
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Padding.lg,
    paddingTop: Padding['2xl'],
  },

  /*
     ILLUSTRATION
   */

  imageContainer: {
    width: ms(140),
    height: ms(140),

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: Margin.lg,
  },

  /*
     HEADING
   */

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

  /*
     INPUT
   */

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

  /*
     BUTTON
   */

  button: {
    width: '100%',
    marginTop: Margin.lg,
  },

  /*
     BACK
   */

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
