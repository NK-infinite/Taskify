import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPassword from '../screens/ForgotPasswor';
import SplashWrapper from '../Navigation/SplashWrapper';
import ProfileScreen from '../screens/Profilescreen';
import TaskManager from '../screens/TaskManager';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashWrapper} />
        <Stack.Screen name="Login"  component={LoginScreen} />
        <Stack.Screen name="Forgotpassword"  component={ForgotPassword} />
        <Stack.Screen name='Singup'component={SignupScreen}/>
        <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
        <Stack.Screen name="Home"  component={HomeScreen} />
        <Stack.Screen name="TaskManager" component={TaskManager} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
