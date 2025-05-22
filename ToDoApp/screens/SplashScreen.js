import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ onAnimationEnd }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageLoaded) {
      // Zoom + Fade in
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          // Zoom-out with fade
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onAnimationEnd?.();
          });
        }, 500);
      });
    }
  }, [imageLoaded]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/splashimage.png')}
        style={[styles.logo, { transform: [{ scale }], opacity }]}
        resizeMode="contain"
        onLoad={() => setImageLoaded(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
});

export default SplashScreen;
