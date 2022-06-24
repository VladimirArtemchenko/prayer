import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectColumnsList} from '../../../store/ducks/columnsList/selectors';
import Board from '../../../UI/Board/Board';
import {ProfileScreenNavigationProp} from '../Navigator';
import {columnsSagaActions} from '../../../store/ducks/columnsList/types';
import SvgPlus from '../../../assets/icons/Plus';
import SvgAddMember from '../../../assets/icons/AddMember';

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Desk = ({navigation}: Props) => {
  const columns = useSelector(selectColumnsList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: columnsSagaActions.FETCH_COLUMNS_SAGA});
  }, []);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>My Desk</Text>
        <TouchableHighlight
          style={styles.plusButton}
          onPress={() => navigation.navigate('AddColumnForm')}>
          <SvgPlus />
        </TouchableHighlight>
      </View>
      {columns === [] ? (
        <Text>You don`t have board</Text>
      ) : (
        <ScrollView style={styles.todosContainer}>
          {columns.map(item => {
            return (
              <Board
                key={item.id}
                title={item.title}
                currentId={item.id}
                navigation={navigation}
              />
            );
          })}
        </ScrollView>
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
    top: 18,
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
