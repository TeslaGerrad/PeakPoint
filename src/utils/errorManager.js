export const getErrorMessage = (error) => {
  // Handle offline state first
  if (!navigator.onLine) {
    return null; // Return null to trigger offline login flow
  }

  // Handle Firebase auth errors
  switch (error?.code) {
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/invalid-email':
      return 'Invalid email format';
    case 'auth/network-request-failed':
      return null; // Return null to trigger offline login flow
    default:
      return error?.message || 'An error occurred';
  }
};