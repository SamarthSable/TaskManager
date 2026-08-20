import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  BorderWidth,
  Colors,
  FontSizes,
  Heights,
  Margin,
  Padding,
  Radius,
  Spacing,
} from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';
import Header from '../../components/Common/Header';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { useDispatch } from 'react-redux';

export default function EditProjectScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const project = route?.params?.project;

  // Date Helpers

  const parseProjectDate = dateString => {
    if (dateString instanceof Date) {
      return dateString;
    }

    if (!dateString) {
      return new Date();
    }

    const currentYear = new Date().getFullYear();

    const parsedDate = new Date(`${dateString}, ${currentYear}`);

    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  };

  const formatDate = date => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });
  };

  // States

  const [projectName, setProjectName] = useState(project?.title || '');

  const [description, setDescription] = useState(project?.description || '');

  const [startDate, setStartDate] = useState(new Date(project?.startDate));

  const [endDate, setEndDate] = useState(new Date(project?.endDate));
  const [priority, setPriority] = useState(project?.priority || 'Medium');

  const [manager, setManager] = useState(project?.owner || '');

  const [teamMembers, setTeamMembers] = useState(project?.teamMembers || []);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  // Team Members

  const handleRemoveMember = index => {
    setTeamMembers(prev =>
      prev.filter((_, memberIndex) => memberIndex !== index),
    );
  };

  const handleAddMember = () => {
    console.log('Open member selection');
  };

  // Date Pickers

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);

    if (!selectedDate) {
      return;
    }

    setStartDate(selectedDate);

    if (selectedDate > endDate) {
      setEndDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);

    if (!selectedDate) {
      return;
    }

    setEndDate(selectedDate);
  };

  //
  // Save
  //

  const handleSave = () => {
    if (!projectName.trim()) {
      dispatch(
        showSnackbar({
          message: 'Please enter project name.',
          type: 'warning',
        }),
      );
      return;
    }

    const updatedProject = {
      ...project,

      title: projectName.trim(),

      description: description.trim(),

      startDate: formatDate(startDate),

      endDate: formatDate(endDate),

      dueDate: formatDate(endDate),

      priority,

      owner: manager,

      teamMembers,
    };

    console.log('Updated Project:', updatedProject);
    dispatch(
      showSnackbar({
        message: 'Project Updated Successfully',
        type: 'success',
      }),
    );
    navigation.goBack();
  };

  // Delete

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

            // Later:
            // dispatch(deleteProject(project.id));

            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Header
          title="Edit Project"
          backgroundColor={Colors.dangerLight}
          rightIcon="trash-outline"
          rightIconColor={Colors.danger}
          onRightPress={handleDelete}
        />

        <ScrollView
          style={{ flex: 1 }}
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
              placeholderTextColor={Colors.placeholder}
              style={styles.input}
            />
          </View>

          {/* Description */}

          <Text style={styles.label}>DESCRIPTION</Text>

          <View style={styles.descriptionContainer}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              placeholder="Enter project description"
              placeholderTextColor="#98A3B3"
              style={styles.descriptionInput}
            />
          </View>

          {/* Dates */}

          <View style={styles.dateRow}>
            {/* Start Date */}

            <View style={styles.dateField}>
              <Text style={styles.label}>START DATE</Text>

              <TouchableOpacity
                style={styles.dateInput}
                activeOpacity={0.7}
                onPress={() => setShowStartPicker(true)}
              >
                <Ionicons
                  name="calendar-outline"
                  size={ms(17)}
                  color="#9AA4B5"
                />

                <Text style={styles.dateText}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
            </View>

            {/* End Date */}

            <View style={styles.dateField}>
              <Text style={styles.label}>END DATE</Text>

              <TouchableOpacity
                style={styles.dateInput}
                activeOpacity={0.7}
                onPress={() => setShowEndPicker(true)}
              >
                <Ionicons
                  name="calendar-outline"
                  size={ms(17)}
                  color="#9AA4B5"
                />

                <Text style={styles.dateText}>{formatDate(endDate)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Start Date Picker */}

          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleStartDateChange}
            />
          )}

          {/* End Date Picker */}

          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={startDate}
              onChange={handleEndDateChange}
            />
          )}

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

          <TouchableOpacity style={styles.managerInput} activeOpacity={0.7}>
            <View style={styles.managerAvatar}>
              <Text style={styles.managerAvatarText}>
                {manager
                  ? manager
                      .split(' ')
                      .map(name => name[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()
                  : 'AC'}
              </Text>
            </View>

            <Text style={styles.managerText}>
              {manager || 'Select manager'}
            </Text>

            <Ionicons name="chevron-down" size={ms(18)} color="#98A3B3" />
          </TouchableOpacity>

          {/* Team Members */}

          <Text style={styles.label}>TEAM MEMBERS</Text>

          <View style={styles.membersContainer}>
            {teamMembers.map((member, index) => (
              <View key={member.id || index} style={styles.memberChip}>
                <View
                  style={[
                    styles.memberAvatar,
                    {
                      backgroundColor: member.color || Colors.primary,
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

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                handleSave();
                Keyboard.dismiss();
              }}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  keyboardContainer: {
    flex: 1,
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

    backgroundColor: Colors.dangerLight,

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Content */

  content: {
    paddingHorizontal: Padding.lg,
    paddingTop: Padding.verticalXl,
    paddingBottom: Padding['3xl'],
  },

  label: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,
    color: Colors.textSecondary,

    paddingVertical: Padding.verticalXs,
  },

  /* Input */

  inputContainer: {
    height: Heights.inputSm,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.lg,

    borderWidth: BorderWidth.thin,
    borderColor: Colors.border,

    borderRadius: Radius['3xl'],

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
    height: Heights.inputLg,

    borderWidth: BorderWidth.thin,
    borderColor: Colors.border,

    borderRadius: Radius['3xl'],

    backgroundColor: Colors.background,

    paddingHorizontal: Padding.lg,
    paddingVertical: Padding.md,
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

    gap: Spacing.md,
  },

  dateColumn: {
    flex: 1,
  },

  dateInput: {
    height: Heights.inputs,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.md,

    borderWidth: BorderWidth.thin,
    borderColor: Colors.border,

    borderRadius: Radius['3xl'],

    backgroundColor: Colors.background,
    gap: Spacing.sm,
  },

  dateText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.body,

    color: Colors.textPrimary,
  },

  /* Priority */

  priorityContainer: {
    flexDirection: 'row',

    gap: Spacing.sm,
  },

  priorityButton: {
    flex: 1,

    height: Heights.inputSm,

    borderRadius: Radius['3xl'],

    backgroundColor: Colors.tabBg,

    alignItems: 'center',
    justifyContent: 'center',
  },

  priorityButtonActive: {
    backgroundColor: Colors.primary,
  },

  priorityButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,
  },

  priorityButtonTextActive: {
    color: Colors.surface,
  },

  /* Manager */

  managerInput: {
    height: Heights.inputs,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.lg,

    borderWidth: BorderWidth.thin,
    borderColor: Colors.border,

    borderRadius: Radius['3xl'],

    backgroundColor: Colors.background,
  },

  managerAvatar: {
    width: Heights.iconLg,
    height: Heights.iconLg,

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

    gap: Spacing.md,
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

    color: Colors.white,
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
