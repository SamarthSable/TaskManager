import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { Bg, Icon } from '../../assets/svgs';

import { fonts } from '../../constants/fonts';
import { moderateScale } from 'react-native-size-matters';
import DottedIndicator from '../../components/Common/DottedIndicator';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#2563EB', '#7C3AED']}
      style={styles.linearGradient}
    >
      {/* Full-screen background */}
      <View style={styles.backgroundContainer}>
        <Bg width="100%" height="100%" />
      </View>

      {/* Center content */}
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon width={50} height={50} />
        </View>

        <Text style={styles.text}>TaskFlow</Text>

        <Text style={styles.sbuText}>Manage. Build. Deliver.</Text>
        <DottedIndicator total={3} activeIndex={0} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#FFFFFF',
    fontSize: 36,
    paddingTop: 10,
    fontFamily: fonts.extraBold,
  },

  sbuText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontFamily: fonts.medium,
    // marginTop: 4,
  },
  iconContainer: {
    backgroundColor: '#FFFFFF33',
    height: 100,
    width: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
