// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from '../style/login_signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../firebase/auth';
import { showErrorNotification, showWarningNotification, showNormalNotification } from '../utils/NotificationHelper';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      await showWarningNotification('Missing Data', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem('userToken', user.uid);
      await showNormalNotification('Login Success', 'You have successfully logged in');
      navigation.replace('Home');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          await showErrorNotification('Login Failed', 'No user found with this email');
          break;
        case 'auth/wrong-password':
          await showWarningNotification('Login Failed', 'Incorrect password');
          break;
        case 'auth/invalid-email':
          await showWarningNotification('Login Failed', 'Invalid email address');
          break;
        default:
          await showErrorNotification('Login Failed', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#bbb"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#bbb"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Forgotpassword')}>
        <Text style={styles.ForgotPasswordtext}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Singup')}>
        <Text style={styles.bottomtext}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
