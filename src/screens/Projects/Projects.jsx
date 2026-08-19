import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, vs } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProjectCard from '../../components/Common/ProjectCard';
import {
  Colors,
  FontSizes,
  Heights,
  Margin,
  Padding,
  Radius,
  Spacing,
  Widths,
} from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';
import { useNavigation } from '@react-navigation/native';

const projects = [
  {
    title: 'Mobile App Redesign',
    owner: 'Alex Chen',
    taskCount: '34',
    teamCount: '6',
    dueDate: 'Dec 28',
    progress: '68%',
    progressWidth: '68%',
    progressColor: '#2260FF',
    iconColor: '#2260FF',

    priority: 'High',
    priorityColor: '#FFF0BE',
    priorityTextColor: '#B77A00',

    status: 'In Progress',
    statusColor: '#E5EDFF',
    statusTextColor: '#2260FF',
    taskCount: 34,
    memberCount: 6,
    startDate: 'Oct 01',
    endDate: 'Dec 28',
  },

  {
    title: 'API Integration v3',
    owner: 'Sarah Kim',
    taskCount: '18',
    teamCount: '4',
    dueDate: 'Jan 15',
    progress: '23%',
    progressWidth: '23%',
    progressColor: '#7C3AED',
    iconColor: '#7C3AED',

    priority: 'Critical',
    priorityColor: '#FFE1E1',
    priorityTextColor: '#D92D20',

    status: 'Todo',
    statusColor: '#F1F3F6',
    statusTextColor: '#667085',
    taskCount: 34,
    memberCount: 6,
    startDate: 'Oct 01',
    endDate: 'Dec 28',
  },

  {
    title: 'Dashboard Analytics',
    owner: 'Mike Ross',
    taskCount: '12',
    teamCount: '3',
    dueDate: 'Dec 10',
    progress: '85%',
    progressWidth: '85%',
    progressColor: '#22C55E',
    iconColor: '#22C55E',

    priority: 'Medium',
    priorityColor: '#DFF4FF',
    priorityTextColor: '#0875B1',

    status: 'Review',
    statusColor: '#FFF4E5',
    statusTextColor: '#B54708',
    taskCount: 34,
    memberCount: 6,
    startDate: 'Oct 01',
    endDate: 'Dec 28',
  },

  {
    title: 'E-Commerce Platform',
    owner: 'Emma Davis',
    taskCount: '56',
    teamCount: '8',
    dueDate: 'Nov 30',
    progress: '100%',
    progressWidth: '100%',
    progressColor: '#F59E0B',
    iconColor: '#F59E0B',

    priority: 'Low',
    priorityColor: '#DDF7E5',
    priorityTextColor: '#16803C',

    status: 'Completed',
    statusColor: '#DDF7E5',
    statusTextColor: '#16803C',
    taskCount: 34,
    memberCount: 6,
    startDate: 'Oct 01',
    endDate: 'Dec 28',
  },
];

const filters = ['All', 'Active', 'Review', 'Done'];

export default function Projects() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (selectedFilter === 'All') {
      return matchesSearch;
    }

    if (selectedFilter === 'Active') {
      return matchesSearch && project.status === 'In Progress';
    }

    if (selectedFilter === 'Review') {
      return matchesSearch && project.status === 'Review';
    }

    if (selectedFilter === 'Done') {
      return matchesSearch && project.status === 'Completed';
    }

    return matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Projects</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NewProject')}
          >
            <Ionicons name="add" size={ms(24)} color={Colors.surface} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={ms(20)} color="#98A2B3" />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search projects..."
            placeholderTextColor="#98A2B3"
            style={styles.searchInput}
          />
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          {filters.map(filter => {
            const active = selectedFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={[
                  styles.filterButton,
                  active && styles.filterButtonActive,
                ]}
              >
                <Text
                  style={[styles.filterText, active && styles.filterTextActive]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Projects */}
        <View style={styles.projectsContainer}>
          {filteredProjects.map((project, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProjectDetail', {
                  project,
                })
              }
            >
              <ProjectCard
                key={index}
                varient="Projects"
                icon="folder-outline"
                iconColor={project.iconColor}
                title={project.title}
                owner={project.owner}
                taskCount={project.taskCount}
                teamCount={project.teamCount}
                dueDate={project.dueDate}
                progress={project.progress}
                progressWidth={project.progressWidth}
                progressColor={project.progressColor}
                priority={project.priority}
                priorityColor={project.priorityColor}
                priorityTextColor={project.priorityTextColor}
                status={project.status}
                statusColor={project.statusColor}
                statusTextColor={project.statusTextColor}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    paddingHorizontal: Padding.md,
    paddingBottom: Padding['3xl'],
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Padding.md,
  },

  title: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.h3,
    color: Colors.black,
  },

  addButton: {
    width: Heights.iconXl,
    height: Heights.iconXl,
    borderRadius: Radius.full,
    backgroundColor: Colors.active,
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 4,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  searchContainer: {
    height: Heights.inputSm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.full,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.md,
  },

  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: FontSizes.body,
  },

  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Padding.verticalSm,
    gap: Spacing.md,
  },

  filterButton: {
    paddingHorizontal: Padding.horizontalLg,
    paddingVertical: Padding.verticalXs,

    borderRadius: Radius.full,
    backgroundColor: Colors.tabBg,
  },

  filterButtonActive: {
    backgroundColor: Colors.active,
  },

  filterText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.caption,
    color: Colors.textSecondary,
  },

  filterTextActive: {
    color: Colors.white,
  },

  projectsContainer: {
    marginTop: vs(2),
    gap: vs(12),
  },
});
