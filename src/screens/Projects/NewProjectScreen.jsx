import React, { useState } from 'react';
import {
  Keyboard,
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
import DateTimePicker from '@react-native-community/datetimepicker';
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
import TabSwitcher from '../../components/Common/TabSwitcher';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { useDispatch } from 'react-redux';
import projects from '../../data/projects';

export default function NewProjectScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  // const [startDate, setStartDate] = useState('Oct 01');
  // const [endDate, setEndDate] = useState('Dec 28');

  const [priority, setPriority] = useState('High');
  const [status, setStatus] = useState('');
  const [manager, setManager] = useState('');

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showManagerModal, setShowManagerModal] = useState(false);

  const statusOptions = ['Todo', 'In Progress', 'Review', 'Completed'];

  const managerOptions = ['Alex Chen', 'Sarah Kim', 'Mike Ross', 'Emma Davis'];
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const formatDate = date => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });
  };

  const handleCreateProject = () => {
    if (!projectName.trim()) {
      dispatch(
        showSnackbar({
          message: 'Please enter Project Name.',
          type: 'warning',
        }),
      );
      return;
    }

    if (!status) {
      dispatch(
        showSnackbar({
          message: 'Please select status',
          type: 'warning',
        }),
      );

      return;
    }

    if (!manager) {
      dispatch(
        showSnackbar({
          message: 'Please select project manager',
          type: 'warning',
        }),
      );

      return;
    }

    const project = {
      id: `project-${Date.now()}`,

      title: projectName.trim(),
      description: description.trim(),

      owner: manager,

      taskCount: 0,
      memberCount: 0,

      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      dueDate: formatDate(endDate),

      progress: 0,

      priority,
      status,

      teamMembers: [],
    };

    console.log('New Project:', project);

    dispatch(
      showSnackbar({
        message: 'Project Cretaed Successfully',
        type: 'success',
      }),
    );

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <Header title={'New Project'} />
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
        >
          {/* Project Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>PROJECT NAME</Text>
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
            {/* Start Date */}
            <View style={styles.dateField}>
              <Text style={styles.label}>START DATE</Text>

              <TouchableOpacity
                style={styles.dateInput}
                activeOpacity={0.7}
                onPress={() => {
                  Keyboard.dismiss();
                  setShowStartPicker(true);
                }}
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
                onPress={() => {
                  Keyboard.dismiss();
                  setShowEndPicker(true);
                }}
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
              onChange={(event, selectedDate) => {
                setShowStartPicker(false);

                if (selectedDate) {
                  setStartDate(selectedDate);

                  // Optional: prevent end date being before start date
                  if (selectedDate > endDate) {
                    setEndDate(selectedDate);
                  }
                }
              }}
            />
          )}

          {/* End Date Picker */}
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={startDate}
              onChange={(event, selectedDate) => {
                setShowEndPicker(false);

                if (selectedDate) {
                  setEndDate(selectedDate);
                }
              }}
            />
          )}

          {/* Priority */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>PRIORITY</Text>

            <TabSwitcher
              tabs={['Low', 'Medium', 'High', 'Critical']}
              activeTab={priority}
              onTabPress={setPriority}
              variant="pill"
            />
          </View>

          {/* Status */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>STATUS</Text>

            <TouchableOpacity
              style={styles.selectInput}
              activeOpacity={0.7}
              onPress={() => {
                Keyboard.dismiss();
                setShowStatusModal(true);
              }}
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
              onPress={() => {
                Keyboard.dismiss();
                setShowManagerModal(true);
              }}
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
              onPress={() => {
                Keyboard.dismiss();
                console.log('Open members');
              }}
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
          <PrimaryButton
            title={'Create Project'}
            onPress={() => {
              Keyboard.dismiss();
              handleCreateProject();
            }}
          />
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
    backgroundColor: Colors.background,
  },

  keyboardContainer: {
    flex: 1,
    paddingBottom: Padding['2xl'],
  },

  /* Scroll */
  scrollview: {
    flex: 1,
  },
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
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.background,
    borderRadius: Radius.full,
    gap: Spacing.sm,
  },

  dateText: {
    fontFamily: fonts.regular,
    fontSize: FontSizes.bodySm,

    color: Colors.textSecondary,
  },

  /* Select */

  selectInput: {
    height: Heights.inputSm,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Padding.horizontalMd,
    backgroundColor: Colors.background,
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
