import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import styles from '../style/homestyle';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const TASKS_KEY = 'TASKIFY_TASKS';
const PROFILE_KEY = 'TASKIFY_PROFILE_';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const uid = auth().currentUser?.uid;
  
  // 1. Load tasks from local storage first for fast UI and offline
  useEffect(() => {
    const loadLocalTasks = async () => {
      try {
        const localData = await AsyncStorage.getItem(TASKS_KEY + uid);
        if (localData) {
          setTasks(JSON.parse(localData));
        }
      } catch (e) {}
      setLoading(false);
    };
    if (uid) loadLocalTasks();
  }, [uid]);

  // 2. Firebase se sync kar ke local storage update karo (corrected)
  useEffect(() => {
    if (!uid) return;
    const ref = database().ref(`/tasks/${uid}`);
    ref.keepSynced(true);
    
    const onValue = snapshot => {
      const data = snapshot.val() || {};
      const taskArray = Object.entries(data).map(([key, val]) => ({
        id: key,
        ...val
      }));
      setTasks(taskArray);
      AsyncStorage.setItem(TASKS_KEY + uid, JSON.stringify(taskArray));
      setLoading(false);
    };
    
    ref.on('value', onValue);
    return () => ref.off('value', onValue);
  }, [uid]);
  
  // 3. Profile data load karo jab bhi HomeScreen focus ho
  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        if (!uid) return;
        try {
          const profileData = await AsyncStorage.getItem(PROFILE_KEY + uid);
          if (profileData) {
            setUserData(JSON.parse(profileData));
          }
        } catch (e) {}
      };
      loadProfile();
    }, [uid])
  );

  // Refresh function
  const onRefresh = () => {
    setRefreshing(true);
    // Firebase listener already updates data, just stop refreshing after short time
    setTimeout(() => setRefreshing(false), 800);
  };

  // Mark task complete
  const markTaskComplete = async (taskId) => {
    try {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
      await database().ref(`/tasks/${uid}/${taskId}`).update({ 
        completed: true,
        completedAt: new Date().toISOString()
      });
      // Local storage update ho jayega Firebase listener se
    } catch (error) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, completed: false } : task
        )
      );
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      {item.completed ? (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>✅ Task Completed</Text>
          {item.completedAt && (
            <Text style={styles.completedTime}>
              Completed on: {new Date(item.completedAt).toLocaleString()}
            </Text>
          )}
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => markTaskComplete(item.id)}
          style={styles.completeButton}
          activeOpacity={0.7}
        >
          <Text style={styles.completeButtonText}>Mark as Complete</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#007bff" style={{ flex: 1, alignSelf: 'center' }} />;

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderTask}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={
        <>
          <View style={styles.topBar}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${userData?.photoBase64}` }}
              style={styles.profileImage}
            />
            <View style={styles.nameSection}>
              <Text style={styles.nameText}>{userData?.name || 'User'}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('ProfileScreen')}
              style={styles.profileButton}
            >
              <Image
                source={require('../assets/cropped_image.png')}
                style={styles.profileIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Your Tasks</Text>
        </>
      }
      ListFooterComponent={
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => navigation.navigate('TaskManager')}
          activeOpacity={0.7}
        >
          <Text style={styles.manageButtonText}>Manage Tasks</Text>
        </TouchableOpacity>
      }
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={['#0000ff']}
        />
      }
    />
  );
};

export default HomeScreen;