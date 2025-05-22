import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import Navigation from './Navigation/Navigation';
import { View } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Platform } from 'react-native';

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
useEffect(() => {
  async function requestPermission() {
    if (Platform.OS === 'android') {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus >= 1) {
        console.log('Permission granted');
      } else {
        console.log('Permission denied');
      }
    }
  }

  requestPermission();
}, []);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible ? (
        <SplashScreen onAnimationEnd={() => setSplashVisible(false)} />
      ) : (
        <Navigation />
      )}
    </View>
  );
};

export default App;