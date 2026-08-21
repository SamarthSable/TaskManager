import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ms, vs } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  BorderWidth,
  Colors,
  FontSizes,
  Heights,
  Margin,
  Padding,
  Radius,
  Widths,
} from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';

export default function Header({
  title,
  rightIcon,
  rightIconComponent: RightIcon,
  onRightPress,
  backgroundColor,
  rightIconColor = Colors.textPrimary,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={ms(22)} color={Colors.textPrimary} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>

      {/* Right Action */}
      {rightIcon || RightIcon ? (
        <TouchableOpacity
          style={[styles.rightButton, backgroundColor && { backgroundColor }]}
          activeOpacity={0.8}
          onPress={onRightPress}
        >
          {RightIcon ? (
            <RightIcon width={ms(21)} height={ms(21)} color={rightIconColor} />
          ) : (
            <Ionicons name={rightIcon} size={ms(21)} color={rightIconColor} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.headerSpacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: Heights.headerH,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Padding.lg,

    borderBottomWidth: BorderWidth.thin,
    borderBottomColor: Colors.border,
  },

  backButton: {
    width: Widths.iconXl,
    height: Heights.iconXl,

    borderRadius: Radius.full,

    backgroundColor: Colors.background,

    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,

    textAlign: 'center',

    marginHorizontal: Margin.horizontalSm,

    fontFamily: fonts.semiBold,
    fontSize: FontSizes.h2,

    color: Colors.textPrimary,
  },

  rightButton: {
    width: Widths.iconXl,
    height: Heights.iconXl,

    borderRadius: Radius.full,
    backgroundColor: Colors.tabBg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerSpacer: {
    width: Widths.iconXl,
    height: Heights.iconXl,
  },
});
