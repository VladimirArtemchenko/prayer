import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface DetailsItemProps {
  title: string;
  info: string;
}
const DetailsItem: FC<DetailsItemProps> = ({title, info}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 15,
    justifyContent: 'center',
    borderColor: '#e5e5e5',
    borderWidth: 1,
    width: '50%',
    height: 120,
  },
  title: {
    color: '#bfb393',
    fontSize: 27,
  },
  subtitle: {
    color: '#514d47',
    fontSize: 14,
  },
});

export default DetailsItem;
