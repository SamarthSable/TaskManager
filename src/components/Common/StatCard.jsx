import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Colors,
  FontSizes,
  Heights,
  Margin,
  Padding,
  Radius,
  Widths,
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
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.statCard} onPress={onPress}>
      <View style={styles.statTop}>
        <View
          style={[
            styles.statIcon,
            {
              backgroundColor: iconBackground,
            },
          ]}
        >
          <Ionicons name={icon} size={ms(16)} color={iconColor} />
        </View>

        <Text
          style={[
            styles.changeText,
            {
              color: positive ? Colors.success : Colors.danger,
            },
          ]}
        >
          {change}
        </Text>
      </View>

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  /* 
     STATS
   */

  statCard: {
    width: '48%',

    minHeight: Heights.statCard,

    backgroundColor: Colors.surface,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Radius.xl,

    padding: Padding.lg,

    marginBottom: Margin.sm,
  },

  statTop: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },

  statIcon: {
    width: Widths.iconMd,
    height: Heights.iconMd,

    borderRadius: Radius.full,

    alignItems: 'center',
    justifyContent: 'center',
  },

  changeText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.caption,
  },

  statValue: {
    fontFamily: fonts.extraBold,
    fontSize: FontSizes.bodyLg,
    color: Colors.textPrimary,
    marginTop: Margin.md,
  },

  statLabel: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.labelSm,

    color: Colors.textSecondary,
  },
});
