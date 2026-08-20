import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { vs } from 'react-native-size-matters';

import { fonts } from '../../constants/fonts';
import {
  FontSizes,
  Radius,
  Padding,
  Spacing,
  Colors,
  Heights,
  Margin,
} from '../../constants/globalStyle';

const TabSwitcher = ({
  tabs = [],
  activeTab,
  onTabPress,
  variant = 'underline', // underline | pill
}) => {
  return (
    <View
      style={[
        styles.container,
        variant === 'underline'
          ? styles.underlineContainer
          : styles.pillContainer,
      ]}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            onPress={() => onTabPress(tab)}
            style={[
              styles.tab,
              variant === 'underline' ? styles.underlineTab : styles.pillTab,
              variant === 'pill' && isActive && styles.pillTabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                variant === 'underline'
                  ? styles.underlineText
                  : styles.pillText,
                isActive &&
                  (variant === 'underline'
                    ? styles.activeUnderlineText
                    : styles.activePillText),
              ]}
            >
              {tab}
            </Text>

            {variant === 'underline' && isActive && (
              <View style={styles.activeLine} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabSwitcher;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: Margin.sm,
    paddingVertical: Padding.verticalXs,
  },

  /* Underline Variant */

  underlineContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },

  underlineTab: {
    flex: 1,
    height: Heights.inputs,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  underlineText: {
    color: Colors.textSecondary,
  },

  activeUnderlineText: {
    color: Colors.primary,
  },

  activeLine: {
    position: 'absolute',
    bottom: -1,
    width: '80%',
    height: Heights.tabLineHeight,
    backgroundColor: Colors.primary,
  },

  /* Pill Variant */

  pillContainer: {
    gap: Spacing.md,
    alignItems: 'center',
  },

  pillTab: {
    paddingHorizontal: Padding.horizontalLg,
    paddingVertical: Padding.verticalXs,
    borderRadius: Radius.full,
    backgroundColor: Colors.tabBg,
  },

  pillTabActive: {
    backgroundColor: Colors.active,
  },

  pillText: {
    color: Colors.textSecondary,
  },

  activePillText: {
    color: Colors.white,
  },

  /* Common */

  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,
  },
});
