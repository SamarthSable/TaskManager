// React imports
import React from 'react';

// React Native imports
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

// Third-party imports
import { vs } from 'react-native-size-matters';

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
        placeholderTextColor={'#000000'}
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
    height: vs(36),
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    borderWidth: 1,
    marginBottom: 8,
  },

  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',

    // borderColor: '#E2E8F0',
    borderRadius: 8,
    fontSize: 14,
    color: '#111827',
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
