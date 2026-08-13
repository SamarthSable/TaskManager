import React, { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Onboard1 from '../../assets/Onboard1.svg';
import Onboard2 from '../../assets/Onboard2.svg';
import Onboard3 from '../../assets/Onboard3.svg';

import PrimaryButton from '../../components/Common/PrimaryButton';
import DottedIndicator from '../../components/Common/DottedIndicator';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/globalStyle';

const onboardingData = [
  {
    id: '1',
    image: Onboard1,
    title: 'Manage Projects Effortlessly',
    description:
      'Organize work into projects with smart prioritization and real-time progress tracking.',
  },

  {
    id: '2',
    image: Onboard2,
    title: 'Collaborate With Your Team',
    description:
      'Assign tasks, share files, and communicate seamlessly with your team in one place.',
  },

  {
    id: '3',
    image: Onboard3,
    title: 'Track Progress & Analytics',
    description:
      'Get powerful insights with charts and reports to keep every project on schedule.',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const flatListRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const screenWidth = event.nativeEvent.layoutMeasurement.width;

    const index = Math.round(offsetX / screenWidth);

    setCurrentIndex(index);
  };

  const handleNext = () => {
    const lastIndex = onboardingData.length - 1;

    if (currentIndex < lastIndex) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      console.log('Get Started');

      // Navigate to your next screen here
      // navigation.replace('Login');

      navigation.replace('Auth');
    }
  };

  const renderItem = ({ item }) => {
    const ImageComponent = item.image;

    return (
      <View style={[styles.page, { width }]}>
        <View style={styles.content}>
          <ImageComponent width={150} height={150} />

          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Onboarding Pages */}
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      />

      {/* Dotted Indicator */}
      <DottedIndicator
        total={onboardingData.length}
        activeIndex={currentIndex}
      />

      {/* Continue / Get Started */}
      <PrimaryButton
        title={
          currentIndex === onboardingData.length - 1
            ? 'Get Started →'
            : 'Continue →'
        }
        onPress={handleNext}
        style={styles.button}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: Colors.surface,
  },

  page: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  title: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: '#182033',
  },

  description: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    color: '#737B89',
  },

  button: {
    width: '90%',
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },
});
