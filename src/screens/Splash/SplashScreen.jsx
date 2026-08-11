import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Container from '../../assets/Container.svg';
import Bg from '../../assets/Bg.svg';
import { fonts } from '../../constants/fonts';
export default function SplashScreen() {
  return (
    <LinearGradient
      // start={{x: 0, y: 0}} means top-left corner
      start={{ x: 0, y: 0 }}
      // end={{x: 1, y: 1}} means bottom-right corner
      end={{ x: 1, y: 1 }}
      colors={['#2563EB', '#7C3AED']}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <View>
          <Bg />
          <Container />
        </View>
        <Text style={styles.text}>TaskFlow</Text>
        <Text style={styles.sbuText}>Manage. Build. Deliver.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 24,

    fontFamily: fonts.bold,
  },
  sbuText: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
  },
});
