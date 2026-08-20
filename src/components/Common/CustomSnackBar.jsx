import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, FontSizes } from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';

export default function CustomSnackBar({
  visible,
  message,
  type = 'success',
  duration = 2000,
  onDismiss,
}) {
  const translateX = useRef(new Animated.Value(300)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      translateX.setValue(300);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideSnackbar();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideSnackbar = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -300,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss && onDismiss();
    });
  };

  if (!visible) return null;

  const getTypeStyle = () => {
    switch (type) {
      case 'success':
        return {
          color: Colors.success,
          icon: 'checkmark-circle',
        };

      case 'error':
        return {
          color: Colors.danger,
          icon: 'close-circle',
        };

      case 'warning':
        return {
          color: Colors.warning,
          icon: 'warning',
        };

      case 'info':
        return {
          color: Colors.primary,
          icon: 'information-circle',
        };

      default:
        return {
          color: Colors.primary,
          icon: 'information-circle',
        };
    }
  };

  const config = getTypeStyle();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX }],
          opacity,
        },
      ]}
    >
      <Ionicons name={config.icon} size={22} color={config.color} />

      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',

    elevation: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  message: {
    flex: 1,
    marginLeft: 10,
    fontsize: FontSizes.Small,
    fontFamily: fonts.medium,
    color: Colors.textPrimary,
  },
});
