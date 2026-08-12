import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function DottedIndicator({ total, activeIndex }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === activeIndex && styles.activeDot]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C7D2E3',
    marginHorizontal: 3,
  },

  activeDot: {
    width: 20,
    backgroundColor: '#2260FF',
  },
});
