/* ========
   STAT CARD
======== */

import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Colors,
  FontSizes,
  Padding,
  Radius,
} from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';
import { ms, vs } from 'react-native-size-matters';
export default function StatCard({
  icon,
  iconColor,
  iconBackground,
  value,
  label,
  change,
  positive,
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTop}>
        <View
          style={[
            styles.statIcon,
            {
              backgroundColor: iconBackground,
            },
          ]}
        >
          <Ionicons name={icon} size={ms(20)} color={iconColor} />
        </View>

        <Text
          style={[
            styles.changeText,
            {
              color: positive ? '#16B866' : '#FF3B30',
            },
          ]}
        >
          {change}
        </Text>
      </View>

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  /* 
     STATS
   */

  statCard: {
    width: '48.3%',

    minHeight: vs(115),

    backgroundColor: Colors.surface,

    borderWidth: 1,
    borderColor: '#E0E6EF',

    borderRadius: ms(16),

    padding: ms(17),

    marginBottom: ms(14),
  },

  statTop: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },

  statIcon: {
    width: ms(40),
    height: ms(40),

    borderRadius: Radius.full,

    alignItems: 'center',
    justifyContent: 'center',
  },

  changeText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.caption,
  },

  statValue: {
    fontFamily: fonts.bold,
    fontSize: ms(28),

    color: Colors.textPrimary,

    marginTop: vs(12),
  },

  statLabel: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,

    marginTop: vs(2),
  },
});
