// import Config from 'react-native-config';

// const generateOtp = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// export const sendOtp = async email => {
//   const otp = generateOtp();

//   const expiresAt = Date.now() + 15 * 60 * 1000;

//   const time = new Date(expiresAt).toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   const body = {
//     service_id: Config.EMAILJS_SERVICE_ID,
//     template_id: Config.EMAILJS_TEMPLATE_ID,
//     user_id: Config.EMAILJS_PUBLIC_KEY,

//     template_params: {
//       to_email: email,
//       passcode: otp,
//       time,
//     },
//   };

//   try {
//     const response = await fetch(
//       'https://api.emailjs.com/api/v1.0/email/send',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       },
//     );

//     const responseText = await response.text();

//     console.log('EmailJS Status:', response.status);
//     console.log('EmailJS Response:', responseText);

//     if (!response.ok) {
//       throw new Error(responseText || 'Unable to send OTP.');
//     }

//     return {
//       email,
//       otp,
//       expiresAt,
//     };
//   } catch (error) {
//     console.log('OTP Send Error:', error);
//     throw error;
//   }
// };

// export const verifyOtp = ({ enteredOtp, storedOtp, expiresAt }) => {
//   if (!storedOtp || !expiresAt) {
//     throw new Error('OTP not found. Please request a new code.');
//   }

//   if (Date.now() > expiresAt) {
//     throw new Error('OTP has expired. Please request a new code.');
//   }

//   if (enteredOtp !== storedOtp) {
//     throw new Error('Invalid OTP. Please check and try again.');
//   }

//   return true;
// };
import Config from 'react-native-config';

import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from '@react-native-firebase/firestore';

import { db } from '../config/firebase';

/* 
   GENERATE OTP
 */

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/* 
   FIRESTORE DOCUMENT ID
 */

const getOtpDocId = email => {
  return encodeURIComponent(email.trim().toLowerCase());
};

/* 
   SEND OTP
 */

export const sendOtp = async email => {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error('Email address is required.');
  }

  const otp = generateOtp();

  // OTP valid for 15 minutes
  const expiresAt = Date.now() + 15 * 60 * 1000;

  const time = new Date(expiresAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const otpDocId = getOtpDocId(normalizedEmail);

  try {
    /* 
       1. STORE OTP IN FIRESTORE
     */

    await setDoc(doc(db, 'PasswordResetOTPs', otpDocId), {
      email: normalizedEmail,

      otp: otp,

      expiresAt: expiresAt,

      verified: false,

      attempts: 0,

      createdAt: new Date(),
    });

    console.log('OTP stored in Firestore');

    /* 
       2. SEND OTP USING EMAILJS
     */

    const body = {
      service_id: Config.EMAILJS_SERVICE_ID,

      template_id: Config.EMAILJS_TEMPLATE_ID,

      user_id: Config.EMAILJS_PUBLIC_KEY,

      template_params: {
        email: normalizedEmail,
        to_email: normalizedEmail,

        passcode: otp,

        time,
      },
    };

    const response = await fetch(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(body),
      },
    );

    const responseText = await response.text();

    console.log('EmailJS Status:', response.status);
    console.log('EmailJS Response:', responseText);

    /* 
       3. EMAIL FAILED
     */

    if (!response.ok) {
      // Remove OTP because email was not sent
      try {
        await deleteDoc(doc(db, 'PasswordResetOTPs', otpDocId));
      } catch (deleteError) {
        console.log('Failed to delete OTP:', deleteError);
      }

      throw new Error(responseText || 'Unable to send OTP.');
    }

    /* 
       4. SUCCESS
     */

    return {
      email: normalizedEmail,
      expiresAt,
    };
  } catch (error) {
    console.log('OTP Send Error:', error);

    throw error;
  }
};

/* 
   VERIFY OTP
 */

export const verifyOtp = async ({ email, enteredOtp }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const otpDocId = getOtpDocId(normalizedEmail);

  try {
    /* 
       GET OTP FROM FIRESTORE
     */

    const otpDocument = await getDoc(doc(db, 'PasswordResetOTPs', otpDocId));

    if (!otpDocument.exists()) {
      throw new Error('OTP not found. Please request a new verification code.');
    }

    const otpData = otpDocument.data();

    /* 
       CHECK EXPIRATION
     */

    if (Date.now() > otpData.expiresAt) {
      await deleteDoc(doc(db, 'PasswordResetOTPs', otpDocId));

      throw new Error(
        'OTP has expired. Please request a new verification code.',
      );
    }

    /* 
       CHECK OTP
     */

    if (enteredOtp.trim() !== otpData.otp) {
      throw new Error('Invalid OTP. Please check and try again.');
    }

    /* 
       MARK OTP VERIFIED
     */

    await setDoc(
      doc(db, 'PasswordResetOTPs', otpDocId),
      {
        verified: true,
        verifiedAt: new Date(),
      },
      {
        merge: true,
      },
    );

    return true;
  } catch (error) {
    console.log('Verify OTP Error:', error);

    throw error;
  }
};

/* 
   CHECK OTP VERIFIED
 */

export const isOtpVerified = async email => {
  const normalizedEmail = email.trim().toLowerCase();

  const otpDocId = getOtpDocId(normalizedEmail);

  const otpDocument = await getDoc(doc(db, 'PasswordResetOTPs', otpDocId));

  if (!otpDocument.exists()) {
    return false;
  }

  const otpData = otpDocument.data();

  if (!otpData.verified) {
    return false;
  }

  if (Date.now() > otpData.expiresAt) {
    await deleteDoc(doc(db, 'PasswordResetOTPs', otpDocId));

    return false;
  }

  return true;
};
