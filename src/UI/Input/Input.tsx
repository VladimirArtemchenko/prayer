import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  invalid: boolean;
}
const Input: React.FC<InputProps> = ({
  placeholder,
  onChangeText,
  value,
  invalid,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
      />
      <View style={styles.error}>
        {invalid && <Text>This is required!</Text>}
      </View>
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
    margin: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Input;
