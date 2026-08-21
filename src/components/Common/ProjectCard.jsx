import { StyleSheet, Text, View } from 'react-native';
import {
  BorderWidth,
  Colors,
  FontSizes,
  Heights,
  Margin,
  Padding,
  Radius,
  Spacing,
  Widths,
} from '../../constants/globalStyle';
import { ms, s, vs } from 'react-native-size-matters';
import { fonts } from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Folder, Icon } from '../../assets/svgs';
export default function ProjectCard({ project, varient }) {
  const {
    icon = Folder,
    iconColor = Colors.primary,
    title,
    owner = 'Alex Chen',

    taskCount,
    memberCount,
    dueDate,

    progress = 0,

    priority,
    priorityColor,
    priorityTextColor,

    status,
    statusColor,
    statusTextColor,

    progressColor = Colors.primary,
  } = project || {};

  const progressValue = `${progress}%`;

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
            {/* <Ionicons name={icon} size={ms(21)} color={iconColor} /> */}
            <Folder color={iconColor} height={vs(24)} width={s(24)} />
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
                  color={Colors.inactive}
                />

                <Text style={styles.infoText}>{taskCount}</Text>
              </View>
            )}

            {/* Team */}
            {memberCount !== undefined && (
              <View style={styles.infoItem}>
                <Ionicons name="people-outline" size={ms(13)} color="#7B8494" />

                <Text style={styles.infoText}>{memberCount}</Text>
              </View>
            )}

            {/* Date */}
            {dueDate && (
              <View style={styles.infoItem}>
                <Ionicons
                  name="calendar-outline"
                  size={Heights.icon}
                  color={Colors.inactive}
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
                  width: progressValue,
                  backgroundColor: progressColor,
                },
              ]}
            />
          </View>

          <Text style={styles.progressText}>{progressValue}</Text>
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
    width: Heights.iconXl,
    height: Widths.iconXl,

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

    marginBottom: Margin.xs,
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
    fontSize: FontSizes.bodySm,

    color: Colors.inactive,
  },

  priorityBadge: {
    paddingHorizontal: Padding.md,
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

    marginBottom: Margin.sm,

    gap: Spacing.md,
  },

  infoItem: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: ms(3),
  },

  infoText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.labelSm,

    color: Colors.inactive,
  },

  statusBadge: {
    marginLeft: 'auto',

    paddingHorizontal: Padding.sm,
    paddingVertical: Padding.verticalXs,

    borderRadius: Radius.full,
  },

  statusText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.labelSm,
  },

  progressRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  progressBackground: {
    flex: 1,

    height: Heights.progressBar,

    backgroundColor: Colors.border,

    borderRadius: Radius.full,

    overflow: 'hidden',

    marginRight: Margin.sm,
  },

  progressFill: {
    height: Heights.full,

    borderRadius: Radius.full,
  },

  progressText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.labelSm,

    color: Colors.textPrimary,

    textAlign: 'right',
  },
});
