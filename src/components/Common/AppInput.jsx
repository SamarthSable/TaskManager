// React imports
import React from 'react';

// React Native imports
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

// Third-party imports
import { vs } from 'react-native-size-matters';
import {
  Colors,
  FontSizes,
  Heights,
  Padding,
  Radius,
} from '../../constants/globalStyle';

// Constants

const AppInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  rightIcon,
  leftIcon,
  onRightIconPress,
  inputStyle,

  ...props
}) => {
  return (
    <View style={[styles.container, inputStyle]}>
      {leftIcon && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={onRightIconPress}
          activeOpacity={0.7}
        >
          {leftIcon}
        </TouchableOpacity>
      )}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        {...props}
      />

      {rightIcon && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={onRightIconPress}
          activeOpacity={0.7}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',

    backgroundColor: Colors.background,
    borderRadius: Radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.border,
    paddingHorizontal: Padding.md,
    borderWidth: 1,
  },

  input: {
    flex: 1,
    // height: Heights.inputSm,
    paddingHorizontal: Padding.horizontalMd,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    fontSize: FontSizes.bodyMd,
    color: Colors.black,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
