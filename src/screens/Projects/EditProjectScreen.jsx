import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ms, vs } from 'react-native-size-matters';

import {
  BorderWidth,
  Colors,
  FontSizes,
  Heights,
  Margin,
  Padding,
  Radius,
} from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';

export default function EditProjectScreen({ navigation, route }) {
  const project = route?.params?.project || {
    title: 'Mobile App Redesign',
    description: 'Complete redesign of the mobile application.',
    startDate: 'Oct 01',
    endDate: 'Dec 28',
    priority: 'High',
    manager: 'Alex Chen',
    teamMembers: [
      {
        name: 'Alex',
        initials: 'AC',
        color: '#2563EB',
      },
      {
        name: 'Sarah',
        initials: 'SK',
        color: '#7C3AED',
      },
      {
        name: 'Mike',
        initials: 'MR',
        color: '#22C55E',
      },
      {
        name: 'Emma',
        initials: 'ED',
        color: '#F59E0B',
      },
    ],
  };

  const [projectName, setProjectName] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);
  const [priority, setPriority] = useState(project.priority);
  const [manager, setManager] = useState(project.manager);
  const [teamMembers, setTeamMembers] = useState(project.teamMembers || []);

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const handleRemoveMember = index => {
    setTeamMembers(prev =>
      prev.filter((_, memberIndex) => memberIndex !== index),
    );
  };

  const handleAddMember = () => {
    console.log('Open member selection');
  };

  const handleSave = () => {
    if (!projectName.trim()) {
      Alert.alert('Validation', 'Please enter project name.');
      return;
    }

    const updatedProject = {
      ...project,
      title: projectName.trim(),
      description: description.trim(),
      startDate,
      endDate,
      priority,
      manager,
      teamMembers,
    };

    console.log('Updated Project:', updatedProject);

    // Later:
    // updateProject(updatedProject)

    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Project',
      `Are you sure you want to delete "${projectName}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Delete project:', project);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={ms(22)}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Project</Text>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={ms(20)} color="#FF4D5E" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* Project Name */}
        <Text style={styles.label}>PROJECT NAME</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="briefcase-outline" size={ms(18)} color="#98A3B3" />

          <TextInput
            value={projectName}
            onChangeText={setProjectName}
            placeholder="Enter project name"
            placeholderTextColor="#98A3B3"
            style={styles.input}
          />
        </View>

        {/* Description */}
        <Text style={styles.label}>DESCRIPTION</Text>

        <View style={styles.descriptionContainer}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Project description..."
            placeholderTextColor="#98A3B3"
            multiline
            textAlignVertical="top"
            style={styles.descriptionInput}
          />
        </View>

        {/* Dates */}
        <View style={styles.dateRow}>
          <View style={styles.dateColumn}>
            <Text style={styles.label}>START DATE</Text>

            <TouchableOpacity style={styles.dateInput}>
              <Ionicons name="calendar-outline" size={ms(17)} color="#98A3B3" />

              <Text style={styles.dateText}>{startDate}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateColumn}>
            <Text style={styles.label}>END DATE</Text>

            <TouchableOpacity style={styles.dateInput}>
              <Ionicons name="calendar-outline" size={ms(17)} color="#98A3B3" />

              <Text style={styles.dateText}>{endDate}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Priority */}
        <Text style={styles.label}>PRIORITY</Text>

        <View style={styles.priorityContainer}>
          {priorities.map(item => {
            const selected = priority === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.priorityButton,
                  selected && styles.priorityButtonActive,
                ]}
                onPress={() => setPriority(item)}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    selected && styles.priorityButtonTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Manager */}
        <Text style={styles.label}>MANAGER</Text>

        <TouchableOpacity style={styles.managerInput}>
          <View style={styles.managerAvatar}>
            <Text style={styles.managerAvatarText}>AC</Text>
          </View>

          <Text style={styles.managerText}>{project.owner}</Text>

          <Ionicons name="chevron-down" size={ms(18)} color="#98A3B3" />
        </TouchableOpacity>

        {/* Team Members */}
        <Text style={styles.label}>TEAM MEMBERS</Text>

        <View style={styles.membersContainer}>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.memberChip}>
              <View
                style={[
                  styles.memberAvatar,
                  {
                    backgroundColor: member.color,
                  },
                ]}
              >
                <Text style={styles.memberAvatarText}>{member.initials}</Text>
              </View>

              <Text style={styles.memberName}>{member.name}</Text>

              <TouchableOpacity onPress={() => handleRemoveMember(index)}>
                <Ionicons name="close" size={ms(15)} color="#A1AAB8" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addMemberButton}
            onPress={handleAddMember}
          >
            <Ionicons
              name="person-add-outline"
              size={ms(16)}
              color={Colors.primary}
            />

            <Text style={styles.addMemberText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
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

  /* Header */

  header: {
    height: vs(65),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Padding.lg,

    backgroundColor: Colors.surface,

    borderBottomWidth: BorderWidth.thin,
    borderBottomColor: '#DFE5EC',
  },

  headerButton: {
    width: ms(44),
    height: ms(44),

    borderRadius: Radius.full,

    backgroundColor: '#F1F4F8',

    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.h3,

    color: Colors.textPrimary,
  },

  deleteButton: {
    width: ms(38),
    height: ms(38),

    borderRadius: Radius.full,

    backgroundColor: '#FFE1E3',

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Content */

  content: {
    paddingHorizontal: Padding.lg,
    paddingTop: Padding.verticalXl,
    paddingBottom: vs(30),
  },

  label: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: '#6D7788',

    marginBottom: Padding.verticalSm,
    marginTop: vs(17),
  },

  /* Input */

  inputContainer: {
    height: Heights.inputSm,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.lg,

    borderWidth: BorderWidth.thin,
    borderColor: '#DCE4ED',

    borderRadius: ms(28),

    backgroundColor: Colors.background,
  },

  input: {
    flex: 1,

    marginLeft: Margin.md,

    fontFamily: fonts.regular,
    fontSize: FontSizes.body,

    color: Colors.textPrimary,
  },

  /* Description */

  descriptionContainer: {
    height: vs(87),

    borderWidth: BorderWidth.thin,
    borderColor: '#DCE4ED',

    borderRadius: ms(24),

    backgroundColor: Colors.background,

    paddingHorizontal: Padding.lg,
    paddingVertical: vs(10),
  },

  descriptionInput: {
    flex: 1,

    fontFamily: fonts.regular,
    fontSize: FontSizes.body,

    color: Colors.textPrimary,
  },

  /* Dates */

  dateRow: {
    flexDirection: 'row',

    gap: ms(15),
  },

  dateColumn: {
    flex: 1,
  },

  dateInput: {
    height: Heights.buttonSm,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: ms(15),

    borderWidth: BorderWidth.thin,
    borderColor: '#DCE4ED',

    borderRadius: ms(28),

    backgroundColor: Colors.background,
  },

  dateText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.body,

    color: Colors.textPrimary,

    marginLeft: ms(11),
  },

  /* Priority */

  priorityContainer: {
    flexDirection: 'row',

    gap: ms(10),
  },

  priorityButton: {
    flex: 1,

    height: Heights.buttonSm,

    borderRadius: ms(24),

    backgroundColor: '#F1F4F8',

    alignItems: 'center',
    justifyContent: 'center',
  },

  priorityButtonActive: {
    backgroundColor: Colors.primary,
  },

  priorityButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: '#6D7788',
  },

  priorityButtonTextActive: {
    color: Colors.surface,
  },

  /* Manager */

  managerInput: {
    height: Heights.inputLg,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: ms(15),

    borderWidth: BorderWidth.thin,
    borderColor: '#DCE4ED',

    borderRadius: ms(27),

    backgroundColor: Colors.background,
  },

  managerAvatar: {
    width: Heights.iconXl,
    height: Heights.iconXl,

    borderRadius: Radius.full,

    backgroundColor: Colors.primary,

    alignItems: 'center',
    justifyContent: 'center',
  },

  managerAvatarText: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.bodySm,

    color: Colors.surface,
  },

  managerText: {
    flex: 1,

    fontFamily: fonts.regular,
    fontSize: FontSizes.body,

    color: Colors.textPrimary,

    marginLeft: Margin.md,
  },

  /* Members */

  membersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    gap: ms(9),
  },

  memberChip: {
    height: vs(48),

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: ms(10),

    borderRadius: Radius.full,

    backgroundColor: '#F1F4F8',
  },

  memberAvatar: {
    width: ms(36),
    height: ms(36),

    borderRadius: Radius.full,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: Margin.sm,
  },

  memberAvatarText: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.labelSm,

    color: Colors.surface,
  },

  memberName: {
    fontFamily: fonts.medium,
    fontSize: FontSizes.bodySm,

    color: Colors.textPrimary,

    marginRight: ms(7),
  },

  addMemberButton: {
    height: Heights.inputSm,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.horizontalLg,

    borderWidth: BorderWidth.medium,
    borderStyle: 'dashed',
    borderColor: Colors.border,

    borderRadius: Radius.full,
  },

  addMemberText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.primary,

    marginLeft: ms(7),
  },

  /* Bottom Buttons */

  bottomButtons: {
    flexDirection: 'row',

    gap: Padding.lg,

    marginTop: vs(25),
  },

  cancelButton: {
    flex: 1,

    height: Heights.buttonSm,

    borderWidth: BorderWidth.thin,
    borderColor: Colors.border,

    borderRadius: ms(18),

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: Colors.background,
  },

  cancelText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.body,

    color: Colors.textPrimary,
  },

  saveButton: {
    flex: 1,

    height: Heights.buttonSm,

    borderRadius: ms(18),

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: Colors.primary,

    elevation: 5,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  saveText: {
    fontFamily: fonts.bold,
    fontSize: FontSizes.body,

    color: Colors.surface,
  },
});
