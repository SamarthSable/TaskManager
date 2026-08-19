import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
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
import { useNavigation } from '@react-navigation/native';

import {
  Colors,
  FontSizes,
  Heights,
  LineHeights,
  Padding,
  Radius,
  Spacing,
  Widths,
} from '../../constants/globalStyle';
import { fonts } from '../../constants/fonts';
import PrimaryButton from '../../components/Common/PrimaryButton';
import AppInput from '../../components/Common/AppInput';
import Header from '../../components/Common/Header';

export default function NewProjectScreen() {
  const navigation = useNavigation();

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  const [startDate, setStartDate] = useState('Oct 01');
  const [endDate, setEndDate] = useState('Dec 28');

  const [priority, setPriority] = useState('High');
  const [status, setStatus] = useState('');
  const [manager, setManager] = useState('');

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showManagerModal, setShowManagerModal] = useState(false);

  const statusOptions = ['Todo', 'In Progress', 'Review', 'Completed'];

  const managerOptions = ['Alex Chen', 'Sarah Kim', 'Mike Ross', 'Emma Davis'];

  const handleCreateProject = () => {
    if (!projectName.trim()) {
      console.log('Please enter project name');
      return;
    }

    if (!status) {
      console.log('Please select status');
      return;
    }

    if (!manager) {
      console.log('Please select project manager');
      return;
    }

    const project = {
      name: projectName.trim(),
      description: description.trim(),
      startDate,
      endDate,
      priority,
      status,
      manager,
      members: [],
    };

    console.log('New Project:', project);

    // Later you can dispatch your createProjectThunk here.

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <Header title={'New Project'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* Project Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>PROJECT NAME</Text>

            {/* <View style={styles.inputContainer}>
              <Ionicons
                name="briefcase-outline"
                size={ms(17)}
                color="#9AA4B5"
              />

              <TextInput
                value={projectName}
                onChangeText={setProjectName}
                placeholder="Enter project name"
                placeholderTextColor="#9AA4B5"
                style={styles.input}
              />
            </View> */}
            <AppInput
              placeholder={'Enter Project name'}
              placeholderTextColor={'#9AA4B5'}
              value={projectName}
              onChangeText={setProjectName}
            />
          </View>

          {/* Description */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>DESCRIPTION</Text>

            <View style={styles.descriptionContainer}>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Project description..."
                placeholderTextColor="#9AA4B5"
                multiline
                textAlignVertical="top"
                style={styles.descriptionInput}
              />
            </View>
          </View>

          {/* Dates */}
          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={styles.label}>START DATE</Text>

              <TouchableOpacity
                style={styles.dateInput}
                activeOpacity={0.7}
                onPress={() => console.log('Open start date picker')}
              >
                <Ionicons
                  name="calendar-outline"
                  size={ms(17)}
                  color="#9AA4B5"
                />

                <Text style={styles.dateText}>{startDate}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateField}>
              <Text style={styles.label}>END DATE</Text>

              <TouchableOpacity
                style={styles.dateInput}
                activeOpacity={0.7}
                onPress={() => console.log('Open end date picker')}
              >
                <Ionicons
                  name="calendar-outline"
                  size={ms(17)}
                  color="#9AA4B5"
                />

                <Text style={styles.dateText}>{endDate}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Priority */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>PRIORITY</Text>

            <View style={styles.priorityRow}>
              {['Low', 'Medium', 'High', 'Critical'].map(item => {
                const selected = priority === item;

                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.8}
                    onPress={() => setPriority(item)}
                    style={[
                      styles.priorityButton,
                      selected && styles.priorityButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        selected && styles.priorityTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Status */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>STATUS</Text>

            <TouchableOpacity
              style={styles.selectInput}
              activeOpacity={0.7}
              onPress={() => setShowStatusModal(true)}
            >
              <Text
                style={[styles.selectText, !status && styles.placeholderText]}
              >
                {status || 'Select status'}
              </Text>

              <Ionicons name="chevron-down" size={ms(18)} color="#9AA4B5" />
            </TouchableOpacity>
          </View>

          {/* Project Manager */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>PROJECT MANAGER</Text>

            <TouchableOpacity
              style={styles.selectInput}
              activeOpacity={0.7}
              onPress={() => setShowManagerModal(true)}
            >
              <Text
                style={[styles.selectText, !manager && styles.placeholderText]}
              >
                {manager || 'Select manager'}
              </Text>

              <Ionicons name="chevron-down" size={ms(18)} color="#9AA4B5" />
            </TouchableOpacity>
          </View>

          {/* Team Members */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>TEAM MEMBERS</Text>

            <TouchableOpacity
              style={styles.addMembersButton}
              activeOpacity={0.7}
              onPress={() => console.log('Open members')}
            >
              <Ionicons
                name="person-add-outline"
                size={ms(17)}
                color={Colors.primary}
              />

              <Text style={styles.addMembersText}>Add Members</Text>
            </TouchableOpacity>
          </View>

          {/* Create Button */}
          <PrimaryButton title={'Create Project'} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Status Modal */}
      <Modal
        visible={showStatusModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowStatusModal(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Status</Text>

            {statusOptions.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.modalOption}
                onPress={() => {
                  setStatus(item);
                  setShowStatusModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>

                {status === item && (
                  <Ionicons
                    name="checkmark"
                    size={ms(20)}
                    color={Colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Manager Modal */}
      <Modal
        visible={showManagerModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowManagerModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowManagerModal(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Manager</Text>

            {managerOptions.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.modalOption}
                onPress={() => {
                  setManager(item);
                  setShowManagerModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>

                {manager === item && (
                  <Ionicons
                    name="checkmark"
                    size={ms(20)}
                    color={Colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  keyboardContainer: {
    flex: 1,
  },

  /* Scroll */

  scrollContent: {
    paddingHorizontal: Padding.lg,
    paddingTop: Padding.sm,
    paddingBottom: Padding.lg,
  },

  /* Labels */

  fieldContainer: {
    paddingBottom: Padding.md,
  },

  label: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,

    // marginBottom: vs(9),
    paddingBottom: Padding.sm,
  },

  /* Description */

  descriptionContainer: {
    height: LineHeights.display2xl,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Radius['3xl'],
  },

  descriptionInput: {
    flex: 1,

    paddingHorizontal: Padding.horizontalMd,
    paddingVertical: Padding.verticalSm,

    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,

    color: Colors.textPrimary,
  },

  /* Dates */

  dateRow: {
    flexDirection: 'row',

    gap: Spacing.md,
    paddingBottom: Padding.verticalSm,
  },

  dateField: {
    flex: 1,
  },

  dateInput: {
    height: Heights.inputSm,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.horizontalMd,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Radius.full,
    gap: Spacing.sm,
  },

  dateText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,
  },

  /* Priority */

  priorityRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    gap: Spacing.sm,
  },

  priorityButton: {
    flex: 1,

    height: Heights.inputSm,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: Radius.full,

    backgroundColor: Colors.tabBg,
  },

  priorityButtonActive: {
    backgroundColor: Colors.primary,
  },

  priorityText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,
  },

  priorityTextActive: {
    color: Colors.surface,
  },

  /* Select */

  selectInput: {
    height: Heights.inputSm,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Padding.horizontalMd,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Radius.full,
  },

  selectText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,

    color: Colors.textPrimary,
  },

  placeholderText: {
    color: Colors.textSecondary,
  },

  /* Add Members */

  addMembersButton: {
    alignSelf: 'flex-start',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: Padding.horizontalMd,
    paddingVertical: Padding.verticalSm,

    borderWidth: 1.5,
    borderColor: Colors.border,

    borderStyle: 'dashed',

    borderRadius: Radius.full,
    gap: Spacing.sm,
  },

  addMembersText: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.bodySm,
    color: Colors.primary,
  },

  /* Modal */

  modalOverlay: {
    flex: 1,

    justifyContent: 'flex-end',

    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modalContainer: {
    paddingHorizontal: Padding.lg,
    paddingTop: vs(20),
    paddingBottom: vs(30),

    backgroundColor: Colors.surface,

    borderTopLeftRadius: ms(24),
    borderTopRightRadius: ms(24),
  },

  modalTitle: {
    fontFamily: fonts.semiBold,
    fontSize: FontSizes.h4,

    color: Colors.textPrimary,

    marginBottom: vs(10),
  },

  modalOption: {
    minHeight: vs(48),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
  },

  modalOptionText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,

    color: Colors.textPrimary,
  },
});
