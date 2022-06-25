import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {FieldError} from 'react-hook-form';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  error: FieldError | undefined;
}
const EditInput: React.FC<InputProps> = ({
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
    width: 200,
  },
  input: {
    paddingLeft: 50,
    width: 200,
  },
});

export default EditInput;
