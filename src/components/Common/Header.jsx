import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ms, vs } from 'react-native-size-matters';
import {
  BorderWidth,
  Colors,
  FontSizes,
  Padding,
  Radius,
} from '../../constants/globalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../constants/fonts';

export default function Header({ title }) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={ms(22)} color={Colors.textPrimary} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: vs(48),

    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: Padding.lg,

    borderBottomWidth: BorderWidth.thin,
    borderBottomColor: Colors.border,
  },

  backButton: {
    width: ms(40),
    height: ms(40),

    borderRadius: Radius.full,

    backgroundColor: Colors.backgroundSecondary,

    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.h2,
    color: Colors.textPrimary,
  },

  headerSpacer: {
    width: ms(40),
  },
});
