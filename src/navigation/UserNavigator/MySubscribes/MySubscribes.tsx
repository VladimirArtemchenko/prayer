import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';

const MySubscribes = () => {
  return (
    <SafeAreaView style={styles.board}>
      <Text>SUBSCRIBED PRAYERS</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  board: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});

export default MySubscribes;
