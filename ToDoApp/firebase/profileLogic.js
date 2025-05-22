import { useEffect, useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';
import { logoutUser } from './logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const PROFILE_KEY = 'TASKIFY_PROFILE_';

export function useProfileLogic(navigation) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [photoBase64, setPhotoBase64] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const user = auth().currentUser;

  // Load from local storage
  useEffect(() => {
    const loadLocalProfile = async () => {
      if (!user) return setLoadingProfile(false);
      try {
        const localData = await AsyncStorage.getItem(PROFILE_KEY + user.uid);
        if (localData) {
          const data = JSON.parse(localData);
          setName(data.name || '');
          setEmail(data.email || user.email || '');
          setPhone(data.phone || '');
          setAge(data.age || '');
          setPhotoBase64(data.photoBase64 || null);
        }
      } catch (e) {}
      setLoadingProfile(false);
    };
    loadLocalProfile();
  }, [user]);

  const saveProfile = async () => {
    if (!name || !email || !age) { // email ab required hai
      Alert.alert('Missing Info', 'Name, email and age are required fields');
      return;
    }
    setUploading(true);
    const profileData = {
      uid: user.uid,
      name,
      email: user.email || email,
      phone, // optional hai
      age,
      photoBase64: photoBase64 || null,
      lastUpdated: Date.now(),
      pendingSync: true,
    };

    await AsyncStorage.setItem(PROFILE_KEY + user.uid, JSON.stringify(profileData));
    setUploading(false);
    Alert.alert('Saved', 'Profile saved locally! Will sync to cloud when online.');
    navigation.replace('Home');
    syncProfileToFirebase(profileData);
  };

  const syncProfileToFirebase = useCallback(async (localProfile = null) => {
    if (!user) return;
    const state = await NetInfo.fetch();
    if (!state.isConnected) return;
    let profile = localProfile;
    if (!profile) {
      const data = await AsyncStorage.getItem(PROFILE_KEY + user.uid);
      if (!data) return;
      profile = JSON.parse(data);
    }
    if (!profile?.pendingSync) return;
    try {
      await database().ref(`/users/${user.uid}`).set({
        ...profile,
        createdAt: database.ServerValue.TIMESTAMP,
        lastUpdated: database.ServerValue.TIMESTAMP,
      });
      profile.pendingSync = false;
      await AsyncStorage.setItem(PROFILE_KEY + user.uid, JSON.stringify(profile));
      console.log("Profile synced to Firebase!");
    } catch (e) {
      console.log("Firebase Sync Error: ", e);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncProfileToFirebase();
      }
    });
    return () => unsubscribe();
  }, [syncProfileToFirebase]);

  useEffect(() => {
    syncProfileToFirebase();
  }, [syncProfileToFirebase]);

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
        includeBase64: true,
      });
      if (!result.didCancel && result.assets?.[0]?.base64) {
        setPhotoBase64(result.assets[0].base64);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to pick image: ' + e.message);
    }
  };

  const logout = () => {
    logoutUser(navigation);
  };

  return {
    name, setName,
    email, setEmail,
    phone, setPhone,
    age, setAge,
    photoBase64,
    uploading,
    loadingProfile,
    pickImage,
    saveProfile,
    logout,
  };
}