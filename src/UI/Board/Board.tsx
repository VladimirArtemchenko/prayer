import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserToken} from '../../store/ducks/user/selectors';
import {setCurrentBoardId} from '../../store/ducks/currentBoardId/reducer';
import {ProfileScreenNavigationProp} from '../../navigation/UserNavigator/Navigator';
import {route} from '../../navigation/routes';

interface BoardProps {
  title: string;
  currentId: number;
  navigation: ProfileScreenNavigationProp;
}

const Board: React.FC<BoardProps> = ({title, currentId, navigation}) => {
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();
  const handleBoardClick = () => {
    dispatch(setCurrentBoardId(currentId));
    dispatch({type: 'FETCH_PRAYERS_SAGA', token});
    navigation.navigate(route.BOARD_SCREEN_ROUTE);
  };

  const handleDelete = () => {
    Alert.alert('Deleting', 'Deleting board', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => dispatch({type: 'DELETE_COLUMN_SAGA', currentId, token}),
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.board}>
      <TouchableHighlight
        style={styles.todosContainer}
        key={currentId}
        onPress={handleBoardClick}
        onLongPress={handleDelete}>
        <Text style={styles.todosTitle}>{title}</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  board: {
    width: '90%',
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
  todosContainer: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Board;
