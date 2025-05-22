import { Alert,View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { 
  showNormalNotification, 
  showWarningNotification, 
  showErrorNotification 
} from '../utils/NotificationHelper';

const handleForgotPassword = async (email) => {
  if (!email) {
    await showWarningNotification('Missing Email', 'Please enter your email');
    return false; // Return false to indicate failure
  }

  try {
    await auth().sendPasswordResetEmail(email);
    await showNormalNotification('Success', 'Password reset email sent. Check your inbox.');
    return true; // Return true to indicate success
  } catch (err) {
    await showErrorNotification('Error', err.message);
    return false; // Return false to indicate failure
  }
};

export default handleForgotPassword;