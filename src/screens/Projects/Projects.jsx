import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, vs } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import EmptyStateCard from '../../components/Common/EmptyStateCard';
import ProjectCard from '../../components/Common/ProjectCard';
import TabSwitcher from '../../components/Common/TabSwitcher';
import projects from '../../data/projects';
import {
  Colors,
  FontSizes,
  Heights,
  Padding,
  Radius,
} from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';

const filters = ['All', 'Active', 'Review', 'Done'];

export default function Projects() {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (selectedFilter === 'All') {
      return true;
    }

    if (selectedFilter === 'Active') {
      return project.status === 'In Progress';
    }

    if (selectedFilter === 'Review') {
      return project.status === 'Review';
    }

    if (selectedFilter === 'Done') {
      return project.status === 'Completed';
    }

    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Projects</Text>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
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
            placeholderTextColor={Colors.placeholder}
            style={styles.searchInput}
          />
        </View>

        {/* Filters */}
        <TabSwitcher
          tabs={filters}
          activeTab={selectedFilter}
          onTabPress={setSelectedFilter}
          variant="pill"
        />
        {/* Projects */}

        <FlatList
          style={styles.projectlist}
          data={filteredProjects}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.projectsContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('ProjectDetail', {
                  project: item,
                })
              }
            >
              <ProjectCard project={item} varient="Projects" />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            // <View style={styles.emptyContainer}>
            //   <Ionicons
            //     name="folder-open-outline"
            //     size={ms(40)}
            //     color={Colors.placeholder}
            //   />

            //   <Text style={styles.emptyText}>No projects found</Text>
            // </View>
            <EmptyStateCard
              icon="folder-outline"
              iconColor={Colors.primary}
              iconBackgroundColor={Colors.projectBg}
              title="No Projects Yet"
              description="Create your first project to start managing work."
              buttonText="Create Project"
              buttonColor={Colors.primary}
              onPress={() => navigation.navigate('NewProject')}
            />
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Padding.sm,
    paddingHorizontal: Padding.md,
    paddingBottom: Padding['3xl'],
  },
  keyboardContainer: {
    flex: 1,
  },

  projectlist: { flex: 1, paddingTop: Padding['2xl'] },
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
    // height: Heights.inputSm,
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

  projectsContainer: {
    flexGrow: 1,
    paddingBottom: Padding['5xl'],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Padding['5xl'],
  },
});
