import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectColumnsList} from '../../store/columnsList/selectors';
import Board from '../Board/Board';

const Desk = () => {
  const columns = useSelector(selectColumnsList);
  const handleClick = () => {
    console.log('ds');
  };
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>My Desk</Text>
        <TouchableHighlight style={styles.plusButton} onPress={handleClick}>
          <Image
            style={styles.plusButton}
            source={require('../../public/plus.png')}
          />
        </TouchableHighlight>
      </View>
      {columns === [] ? (
        <Text>You don`t have board</Text>
      ) : (
        <View style={styles.todosContainer}>
          {columns.map(item => {
            return <Board title={item.title} key={item.id} />;
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  todosContainer: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    width: '100%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  sectionTitle: {
    color: 'black',
    fontFamily: 'SF UI Text',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.024,
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
  plusButton: {
    position: 'absolute',
    top: 12,
    right: 15,
    width: 16,
    height: 16,
  },
  emailInput: {
    width: 325,
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
});

export default Desk;
