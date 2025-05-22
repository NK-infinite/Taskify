import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { signupUser } from '../firebase/auth'; 
import styles from '../style/login_signup';
import { showErrorNotification,showNormalNotification,showWarningNotification } from '../utils/NotificationHelper';
export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      await showWarningNotification('Missing Fields', 'Please fill all the required fields');
      return;
    }

    if (password !== confirmPassword) {
      await showErrorNotification('Password Mismatch', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signupUser(email, password);
      await showNormalNotification('Signup Successful', 'Account created successfully!');
      navigation.replace('ProfileScreen');
    } catch (err) {
      let errorMessage = 'Signup Failed';
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage = err.message;
      }
      await showErrorNotification('Signup Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

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

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#bbb"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignup}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

       <TouchableOpacity  onPress={() => navigation.navigate('Login')}>

      <Text style={styles.bottomtext}>you have alredy account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}


