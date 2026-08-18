import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ms, vs } from 'react-native-size-matters';
import TaskCard from '../../components/Task/TaskCard';
import {
  Colors,
  FontSizes,
  Heights,
  Margin,
  Padding,
  Radius,
} from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';
import Header from '../../components/Common/Header';

export default function ProjectDetailScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Tasks');

  const project = route?.params?.project || {
    title: 'Mobile App Redesign',
    owner: 'Alex Chen',
    progress: 68,
    priority: 'High',
    priorityColor: '#FEF3C7',
    priorityTextColor: '#92400E',
    taskCount: 34,
    memberCount: 6,
    startDate: 'Oct 01',
    endDate: 'Dec 28',
  };

  const tasks = [
    {
      title: 'Design system component library',
      owner: 'Alex Chen',
      status: 'In Progress',
      statusColor: '#E5EDFF',
      statusTextColor: '#2260FF',
      dotColor: '#F59E0B',
    },
    {
      title: 'User authentication flow',
      owner: 'Emma Davis',
      status: 'Completed',
      statusColor: '#D9FBE7',
      statusTextColor: '#16803C',
      dotColor: '#F59E0B',
    },
    {
      title: 'Push notification service',
      owner: 'Alex Chen',
      status: 'Backlog',
      statusColor: '#F4F6F8',
      statusTextColor: '#64748B',
      dotColor: '#2563EB',
    },
    {
      title: 'Dark mode implementation',
      owner: 'Mike Ross',
      status: 'Testing',
      statusColor: '#F0E2FF',
      statusTextColor: '#7C3AED',
      dotColor: '#22C55E',
    },
  ];

  const tabs = ['Tasks', 'Team', 'Files', 'Activity'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={ms(21)}
            color={Colors.textPrimary}
          />
        </TouchableOpacity> */}
        <Header title={''} />

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() =>
            navigation.navigate('EditProject', {
              project,
            })
          }
        >
          <Ionicons
            name="create-outline"
            size={ms(21)}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Project Header */}
        <View style={styles.projectHeader}>
          <View style={styles.projectIcon}>
            <Ionicons
              name="folder-outline"
              size={ms(25)}
              color={Colors.primary}
            />
          </View>

          <View style={styles.projectInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.projectTitle} numberOfLines={1}>
                {project.title}
              </Text>

              <View
                style={[
                  styles.priorityBadge,
                  {
                    backgroundColor: project.priorityColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    {
                      color: project.priorityTextColor,
                    },
                  ]}
                >
                  {project.priority}
                </Text>
              </View>
            </View>

            <Text style={styles.owner}>{project.owner}</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressValue}>{project.progress}%</Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${project.progress}%`,
              },
            ]}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            icon="checkbox-outline"
            value={project.taskCount}
            label="Tasks"
          />

          <StatCard
            icon="people-outline"
            value={project.memberCount || 54}
            label="Members"
          />

          <StatCard
            icon="calendar-outline"
            value={project.startDate || 'Aug 18'}
            label="Start"
          />

          <StatCard
            icon="flag-outline"
            value={project.endDate || 'Dec 13'}
            label="End"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>

              {activeTab === tab && <View style={styles.activeTabLine} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'Tasks' && (
          <View style={styles.tasksContainer}>
            {/* Add Task */}
            <TouchableOpacity style={styles.addTaskButton}>
              <Ionicons name="add" size={ms(18)} color={Colors.primary} />

              <Text style={styles.addTaskText}>Add Task</Text>
            </TouchableOpacity>

            {/* Tasks */}
            {tasks.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
          </View>
        )}

        {activeTab === 'Team' && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="people-outline"
              size={ms(35)}
              color={Colors.textSecondary}
            />
            <Text style={styles.emptyText}>Team members</Text>
          </View>
        )}

        {activeTab === 'Files' && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-outline"
              size={ms(35)}
              color={Colors.textSecondary}
            />
            <Text style={styles.emptyText}>Project files</Text>
          </View>
        )}

        {activeTab === 'Activity' && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="time-outline"
              size={ms(35)}
              color={Colors.textSecondary}
            />
            <Text style={styles.emptyText}>Project activity</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* 
   STAT CARD
 */

function StatCard({ icon, value, label }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={ms(17)} color={Colors.primary} />

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

/* FontSizes
   TASK CARD
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  scrollContent: {
    paddingBottom: vs(30),
  },

  /* Header */

  header: {
    height: vs(62),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Padding.lg,

    borderBottomWidth: 1,
    borderBottomColor: '#E7EBF1',
  },

  headerButton: {
    width: ms(40),
    height: ms(40),

    borderRadius: Radius.full,

    backgroundColor: '#F1F4F8',

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Project */

  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.lg,
    paddingTop: vs(15),
  },

  projectIcon: {
    width: ms(45),
    height: ms(45),

    borderRadius: Radius.full,

    backgroundColor: '#E5EDFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: ms(14),
  },

  projectInfo: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  projectTitle: {
    flex: 1,

    fontFamily: fonts.bold,
    fontSize: FontSizes.h3,

    color: Colors.textPrimary,

    marginRight: ms(8),
  },

  owner: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,

    marginTop: vs(2),
  },

  priorityBadge: {
    paddingHorizontal: ms(10),
    paddingVertical: vs(4),

    borderRadius: Radius.full,
  },

  priorityText: {
    fontFamily: fonts.semiBold,
    fontSize: ms(10),
  },

  /* Progress */

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginHorizontal: Padding.lg,
    marginTop: vs(15),
    marginBottom: vs(7),
  },

  progressLabel: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,
  },

  progressValue: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.textPrimary,
  },

  progressBackground: {
    height: vs(7),

    marginHorizontal: Padding.lg,

    backgroundColor: '#E2E8F0',

    borderRadius: Radius.full,

    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',

    backgroundColor: Colors.primary,

    borderRadius: Radius.full,
  },

  /* Stats */

  statsContainer: {
    flexDirection: 'row',

    gap: ms(9),

    marginHorizontal: Padding.lg,
    marginTop: vs(15),
  },

  statCard: {
    flex: 1,

    height: Heights.buttonLg,

    borderRadius: ms(18),

    backgroundColor: '#F1F4F8',

    alignItems: 'center',
    justifyContent: 'center',
  },

  statValue: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.bodySm,

    color: Colors.textPrimary,

    marginTop: vs(4),
  },

  statLabel: {
    fontFamily: fonts.regular,
    fontSize: ms(9),

    color: '#9AA4B2',

    marginTop: vs(3),
  },

  /* Tabs */

  tabsContainer: {
    flexDirection: 'row',

    marginTop: vs(14),

    borderTopWidth: 1,
    borderBottomWidth: 1,

    borderColor: '#E1E6ED',
  },

  tab: {
    flex: 1,

    height: vs(50),

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
  },

  tabText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: '#7B8494',
  },

  activeTabText: {
    color: Colors.primary,
  },

  activeTabLine: {
    position: 'absolute',

    bottom: -1,

    width: '80%',
    height: vs(2),

    backgroundColor: Colors.primary,
  },

  /* Tasks */

  tasksContainer: {
    paddingHorizontal: Padding.lg,
    paddingTop: vs(15),
  },

  addTaskButton: {
    height: Heights.buttonSm,

    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#B6CCF8',

    borderRadius: ms(25),

    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',

    marginBottom: Margin.sm,
  },

  addTaskText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.primary,

    marginLeft: ms(6),
  },

  /* Other tabs */

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: vs(50),
  },

  emptyText: {
    fontFamily: fonts.medium,
    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,

    marginTop: vs(10),
  },
});
