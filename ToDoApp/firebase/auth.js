// firebase/auth.js
import auth from '@react-native-firebase/auth';

export const loginUser = async (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signupUser = async (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};
