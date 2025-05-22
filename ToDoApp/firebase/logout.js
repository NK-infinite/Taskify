// authUtils.js
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';



export const logoutUser = async (navigation) => {
  const user = auth().currentUser;

  if (!user) {
    console.log("No user currently signed in.");
    Alert.alert("Already Logged Out", "You're already signed out.");
    navigation.replace('Login');
    return;
  }

  try {
    await auth().signOut();
    await AsyncStorage.removeItem('userToken');
    console.log('User signed out');
    Alert.alert('Logout Success', 'You have been signed out.');
    navigation.replace('Login');
  } catch (error) {
    console.log('Logout failed:', error.message);
    Alert.alert('Logout Failed', error.message);
  }
};
