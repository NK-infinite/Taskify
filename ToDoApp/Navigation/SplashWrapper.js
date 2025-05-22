import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashWrapper = ({ navigation }) => {
  const handleAnimationEnd = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
    
  };

  return <SplashScreen onAnimationEnd={handleAnimationEnd} />;
};

export default SplashWrapper;
