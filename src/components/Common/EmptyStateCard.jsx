import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ms, vs } from 'react-native-size-matters';

import {
  Colors,
  FontSizes,
  Padding,
  Radius,
} from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';

export default function EmptyStateCard({
  icon = 'folder-outline',
  title,
  description,
  buttonText,
  iconColor = Colors.primary,
  iconBackgroundColor = '#EAF1FF',
  buttonColor = Colors.primary,
  onPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Icon */}
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: iconBackgroundColor,
            },
          ]}
        >
          <Ionicons name={icon} size={ms(30)} color={iconColor} />
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.button,
            {
              backgroundColor: buttonColor,
            },
          ]}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    marginHorizontal: Padding.lg,
    marginBottom: vs(20),

    paddingHorizontal: Padding.lg,
    paddingVertical: Padding['2xl'],

    alignItems: 'center',

    backgroundColor: Colors.surface,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Radius.xl,
  },

  iconContainer: {
    width: ms(70),
    height: ms(70),

    borderRadius: ms(18),

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: vs(17),
  },

  title: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.body,

    color: Colors.textPrimary,

    textAlign: 'center',

    marginBottom: vs(7),
  },

  description: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,

    color: '#6D7788',

    textAlign: 'center',

    marginBottom: vs(17),
  },

  button: {
    minWidth: ms(145),

    paddingHorizontal: ms(20),
    paddingVertical: vs(10),

    borderRadius: Radius.full,

    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.bodySm,

    color: Colors.surface,
  },
});
