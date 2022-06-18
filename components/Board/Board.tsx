import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';

interface BoardProps {
  title: string;
}

const Board: React.FC<BoardProps> = ({title}) => {
  return (
    <SafeAreaView style={styles.board}>
      <Text style={styles.todosTitle}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  board: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    height: 59,
  },
  todosTitle: {
    paddingTop: 20,
    paddingLeft: 15,
    color: 'black',
    fontFamily: 'SF UI Text',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.024,
  },
});

export default Board;
