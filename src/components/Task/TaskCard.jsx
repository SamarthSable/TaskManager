import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { Colors, FontSizes, Radius } from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';

export default function TaskCard({ task }) {
  return (
    <TouchableOpacity style={styles.taskCard}>
      <View
        style={[
          styles.taskDot,
          {
            backgroundColor: task.dotColor,
          },
        ]}
      />

      <View style={styles.taskContent}>
        <Text style={styles.taskTitle} numberOfLines={1}>
          {task.title}
        </Text>

        <Text style={styles.taskOwner}>{task.owner}</Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: task.statusColor,
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color: task.statusTextColor,
            },
          ]}
        >
          {task.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  /* Task Card */

  taskCard: {
    minHeight: vs(70),

    borderWidth: 1,
    borderColor: '#DEE5EE',

    borderRadius: ms(19),

    backgroundColor: Colors.surface,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: ms(14),

    marginBottom: vs(10),
  },

  taskDot: {
    width: ms(10),
    height: ms(10),

    borderRadius: Radius.full,

    marginRight: ms(14),
  },

  taskContent: {
    flex: 1,

    marginRight: ms(8),
  },

  taskTitle: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.textPrimary,
  },

  taskOwner: {
    fontFamily: fonts.regular,
    fontSize: ms(10),

    color: Colors.textSecondary,

    marginTop: vs(2),
  },

  statusBadge: {
    paddingHorizontal: ms(10),
    paddingVertical: vs(6),

    borderRadius: Radius.full,
  },

  statusText: {
    fontFamily: fonts.semiBold,
    fontSize: ms(10),
  },
});
