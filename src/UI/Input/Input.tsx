import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {FieldError} from 'react-hook-form';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  error: FieldError | undefined;
}
const Input: React.FC<InputProps> = ({
  placeholder,
  onChangeText,
  value,
  error,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
      />
      <View style={styles.error}>{error && <Text>{error.message}</Text>}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    paddingLeft: 15,
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
  },
  input: {
    paddingTop: 15,
    paddingLeft: 76,
    width: '100%',
    height: 50,
    marginBottom: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Input;
