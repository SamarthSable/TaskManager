import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Colors,
  Heights,
  Margin,
  Radius,
  Widths,
} from '../../constants/globalStyle';

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
    width: Widths.xxs,
    height: Heights.xxs,
    borderRadius: Radius.xs,
    backgroundColor: Colors.background,
    marginHorizontal: Margin.horizontalXs,
  },

  activeDot: {
    width: Widths.iconSm,
    backgroundColor: Colors.primary,
  },
});
