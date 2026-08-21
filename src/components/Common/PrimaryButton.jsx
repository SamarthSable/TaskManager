// import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// import React from 'react';

// export default function PrimaryButton({ title }) {
//   return (
//     <TouchableOpacity style={styles.button}>
//       <Text style={styles.label}> {title}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     width: '100%',
//     height: 44,
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     backgroundColor: '#2563EB',
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',

//     gap: 8,
//   },
//   label: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
// });
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  Colors,
  FontSizes,
  FontWeights,
  Heights,
  Padding,
  Radius,
  Shadows,
} from '../../constants/globalStyle';
import { ms, s, vs } from 'react-native-size-matters';

export default function PrimaryButton({ title, onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Heights.buttonS,
    paddingHorizontal: Padding.horizontal2xl,

    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.primaryButton,
  },

  label: {
    fontSize: FontSizes.bodyMd,
    fontWeight: FontWeights.semibold,
    color: Colors.white,
  },
});
