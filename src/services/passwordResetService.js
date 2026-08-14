const { getAuth } = require('firebase-admin/auth');

const adminAuth = getAuth();

const resetUserPassword = async (email, newPassword) => {
  try {
    const user = await adminAuth.getUserByEmail(email);

    await adminAuth.updateUser(user.uid, {
      password: newPassword,
    });

    return {
      success: true,
      message: 'Password updated successfully.',
    };
  } catch (error) {
    console.error('Password reset error:', error);

    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  resetUserPassword,
};
