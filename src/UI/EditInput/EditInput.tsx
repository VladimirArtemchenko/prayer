import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  invalid: boolean;
}
const EditInput: React.FC<InputProps> = ({
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
    paddingTop: 5,
    paddingLeft: 50,
    width: 200,
    height: 40,
    borderColor: 'dd#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default EditInput;
