import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView
} from 'react-native';
import { useProfileLogic } from '../firebase/profileLogic';
import styles from '../style/profileStyles';

export default function ProfileScreen({ navigation }) {
  const {
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
  } = useProfileLogic(navigation);

  if (loadingProfile) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../assets/leftarrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Your Profile</Text>

        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {photoBase64 ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${photoBase64}` }}
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.imageText}>Add Photo</Text>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Full Name *"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email *" // ab required ka star lag gaya hai
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Phone Number" // optional, star nahi hai
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="Age *"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          onPress={saveProfile}
          disabled={uploading}
          style={[styles.button, uploading && styles.buttonDisabled]}
        >
          {uploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Profile</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}