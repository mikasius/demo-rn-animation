import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('screen');

export const App = () => {
  const translate = useRef<Animated.Value>(new Animated.Value(0)).current;
  const rotate = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    animate();
    animateRotation();
  }, []);

  const interpolatedValue = translate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width / 2 - styles.box.width / 2],
  });

  const animate = useCallback(() => {
    Animated.timing(translate, { toValue: 1, useNativeDriver: true }).start(
      () => {
        Animated.spring(translate, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 16,
        }).start();
      }
    );
  }, []);

  const animatedStyle = { transform: [{ translateX: interpolatedValue }] };

  const interpolatedValueRotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360],
  });

  const animateRotation = useCallback(() => {
    Animated.timing(rotate, { toValue: 1, useNativeDriver: true }).start(() => {
      Animated.timing(rotate, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const animatedStyleRotate = {
    transform: [{ rotate: interpolatedValueRotation }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>RN-Reanimated Demo</Text>
      </View>

      <View style={styles.canvas}>
        <Animated.View style={[styles.box, animatedStyle]} />
        <Animated.View style={[styles.box, animatedStyleRotate]} />
      </View>
    </SafeAreaView>
  );
};

export const debugStyle = {
  borderWidth: 1,
  borderColor: 'tomato',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: '100%',
    padding: 32,
    alignItems: 'center',
  },

  canvas: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: 100,
    height: 100,

    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'tomato',
  },
});
