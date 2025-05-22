import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import Navigation from './Navigation/Navigation';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const PROFILE_KEY = 'TASKIFY_PROFILE_';

const syncPendingProfile = async () => {
  const user = auth().currentUser;
  if (!user) return;
  try {
    const data = await AsyncStorage.getItem(PROFILE_KEY + user.uid);
    if (!data) return;
    const profile = JSON.parse(data);
    if (profile?.pendingSync) {
      await database().ref(`/users/${user.uid}`).set({
        ...profile,
        createdAt: database.ServerValue.TIMESTAMP,
        lastUpdated: database.ServerValue.TIMESTAMP,
      });
      profile.pendingSync = false;
      await AsyncStorage.setItem(PROFILE_KEY + user.uid, JSON.stringify(profile));
      console.log('Profile globally synced to Firebase!');
    }
  } catch (e) {
    // Ignore errors, try next time
    console.log('Global profile sync error:', e.message);
  }
};

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  // Global network listener for pending profile sync
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncPendingProfile();
      }
    });
    return () => unsubscribe();
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