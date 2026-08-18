import { StyleSheet, Text, View } from 'react-native';
import {
  BorderWidth,
  Colors,
  FontSizes,
  Margin,
  Padding,
  Radius,
} from '../../constants/globalStyle';
import { ms, vs } from 'react-native-size-matters';
import { fonts } from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProjectCard({
  icon = 'folder-outline',
  iconColor = Colors.primary,
  title,
  owner = 'Alex Chen',

  taskCount,
  teamCount,
  dueDate,

  progress,
  progressWidth,

  priority,
  priorityColor,
  priorityTextColor,

  status,
  statusColor,
  statusTextColor,

  progressColor = Colors.primary,

  varient,
}) {
  return (
    <View style={styles.projectCard}>
      <View style={styles.projectContent}>
        {/* Top Section */}
        <View style={styles.projectTop}>
          {/* Project Icon */}
          <View
            style={[
              styles.projectIcon,
              {
                backgroundColor: `${iconColor}18`,
              },
            ]}
          >
            <Ionicons name={icon} size={ms(21)} color={iconColor} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.projectTitle} numberOfLines={1}>
              {title}
            </Text>

            {/* Owner */}
            {varient !== 'Home' && (
              <Text style={styles.ownerText}>{owner}</Text>
            )}
          </View>

          {/* Priority */}
          {priority && (
            <View
              style={[
                styles.priorityBadge,
                {
                  backgroundColor: priorityColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  {
                    color: priorityTextColor,
                  },
                ]}
              >
                {priority}
              </Text>
            </View>
          )}
        </View>

        {/* Project Information */}
        {varient !== 'Home' && (
          <View style={styles.infoRow}>
            {/* Tasks */}
            {taskCount !== undefined && (
              <View style={styles.infoItem}>
                <Ionicons
                  name="checkbox-outline"
                  size={ms(12)}
                  color="#7B8494"
                />

                <Text style={styles.infoText}>{taskCount}</Text>
              </View>
            )}

            {/* Team */}
            {teamCount !== undefined && (
              <View style={styles.infoItem}>
                <Ionicons name="people-outline" size={ms(13)} color="#7B8494" />

                <Text style={styles.infoText}>{teamCount}</Text>
              </View>
            )}

            {/* Date */}
            {dueDate && (
              <View style={styles.infoItem}>
                <Ionicons
                  name="calendar-outline"
                  size={ms(12)}
                  color="#7B8494"
                />

                <Text style={styles.infoText}>{dueDate}</Text>
              </View>
            )}

            {/* Status */}
            {status && (
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: statusColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: statusTextColor,
                    },
                  ]}
                >
                  {status}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: progressWidth,
                  backgroundColor: progressColor,
                },
              ]}
            />
          </View>

          <Text style={styles.progressText}>{progress}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  projectCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    marginBottom: Margin.md,
    padding: Padding.lg,

    backgroundColor: Colors.surface,

    borderWidth: BorderWidth.thin,
    borderColor: Colors.border,

    borderRadius: Radius.xl,
  },

  projectIcon: {
    width: ms(42),
    height: ms(42),

    borderRadius: Radius.full,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: Margin.md,
  },

  projectContent: {
    flex: 1,
  },

  projectTop: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    justifyContent: 'space-between',

    marginBottom: vs(6),
  },

  titleContainer: {
    flex: 1,
    marginRight: Margin.sm,
  },

  projectTitle: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.textPrimary,
  },

  ownerText: {
    fontFamily: fonts.regular,
    fontSize: ms(11),

    color: '#6D7788',

    marginTop: vs(3),
  },

  priorityBadge: {
    paddingHorizontal: ms(11),
    paddingVertical: Padding.verticalXs,

    borderRadius: Radius.full,
  },

  priorityText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.labelSm,
  },

  infoRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: vs(9),

    gap: ms(10),
  },

  infoItem: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: ms(3),
  },

  infoText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.labelSm,

    color: '#6D7788',
  },

  statusBadge: {
    marginLeft: 'auto',

    paddingHorizontal: ms(9),
    paddingVertical: Padding.verticalXs,

    borderRadius: Radius.full,
  },

  statusText: {
    fontFamily: fonts.semiBold,
    fontSize: ms(9),
  },

  progressRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  progressBackground: {
    flex: 1,

    height: vs(6),

    backgroundColor: '#E3E8EF',

    borderRadius: Radius.full,

    overflow: 'hidden',

    marginRight: Margin.sm,
  },

  progressFill: {
    height: '100%',

    borderRadius: Radius.full,
  },

  progressText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.labelSm,

    color: Colors.textPrimary,

    width: ms(30),

    textAlign: 'right',
  },
});
