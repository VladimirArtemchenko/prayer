import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface ButtonProps {
  size: string;
  title: string;
}
const PrimaryButton: React.FC<ButtonProps> = ({size, title}) => {
  return (
    <View style={styles[`${size}`]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SF UI Text',
    fontSize: 12,
    lineHeight: 14,
    color: 'white',
  },
  home: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    backgroundColor: '#BFB393',
    shadowColor: 'rgba(66, 78, 117, 0.1)',
    borderRadius: 5,
  },
  small: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 209,
    height: 30,
    backgroundColor: '#BFB393',
    shadowColor: 'rgba(66, 78, 117, 0.1)',
    borderRadius: 15,
  },
  delete: {
    position: 'absolute',
    right: 0,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 68,
    backgroundColor: '#AC5253',
    marginLeft: 30,
  },
});

export default PrimaryButton;
