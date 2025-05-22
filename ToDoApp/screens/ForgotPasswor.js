import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from '../style/login_signup';
import handleForgotPassword from '../firebase/Password';
import LoginScreen from './LoginScreen';
export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const onForgotPress = async () => {
    setLoading(true);
    try {
      const success = await handleForgotPassword(email);
      if (success) {
        setEmail('');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#bbb"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={onForgotPress}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send Email</Text>
        )}
      </TouchableOpacity>

     <TouchableOpacity onPress={() => navigation.navigate('Login')}>

      <Text style={styles.bottomtext}>Go to Login page</Text>
      </TouchableOpacity>
    </View>
  );
}