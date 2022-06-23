import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectPrayerList} from '../../../store/prayerList/selectors';
import {selectCurrentBoardId} from '../../../store/currentBoardId/selectors';
import AddPrayerForm from '../../../assets/UI/AddPrayerForm/AddPrayerForm';
import {ProfileScreenNavigationProp} from '../Navigator';
import {selectColumnsList} from '../../../store/columnsList/selectors';
import Prayer from '../../../assets/UI/Prayer/Prayer';
import SvgSettings from '../../../assets/icons/Settings';

interface BoardScreenProps {
  navigation: ProfileScreenNavigationProp;
}

const BoardScreen: React.FC<BoardScreenProps> = ({navigation}) => {
  const prayerList = useSelector(selectPrayerList);
  const columnsList = useSelector(selectColumnsList);
  const currentBoardId = useSelector(selectCurrentBoardId);
  const currentBoard = useMemo(
    () => columnsList.find(column => column.id === currentBoardId),
    [columnsList, currentBoardId],
  );
  const currentPrayerList = useMemo(
    () => prayerList.filter(prayer => prayer.columnId === currentBoardId),
    [prayerList, currentBoardId],
  );
  return (
    <SafeAreaView style={styles.board}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentBoard && currentBoard.title}</Text>
        <View style={styles.settings}>
          <SvgSettings />
        </View>

        <View style={styles.menuContainer}>
          <TouchableHighlight
            style={true ? styles.menuItemActive : styles.menuItem}>
            <Text
              style={true ? styles.menuItemTextActive : styles.menuItemText}>
              {'My prayers'.toUpperCase()}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={false ? styles.menuItemActive : styles.menuItem}>
            <Text
              style={false ? styles.menuItemTextActive : styles.menuItemText}>
              {'subscribed'.toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>
      </View>

      <AddPrayerForm navigation={navigation} currentBoardId={currentBoardId} />
      <ScrollView>
        {currentPrayerList.map(prayer => (
          <Prayer
            key={prayer.id}
            title={prayer.title}
            prayerId={prayer.id}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  board: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    // height: 103,
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  settings: {
    position: 'absolute',
    top: 24,
    left: 336,
    width: 24,
    height: 24,
  },
  title: {
    color: 'black',
    marginTop: 22,
    marginBottom: 28,
    fontFamily: 'SF UI Text',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.024,
  },
  menuItemActive: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#72A8BC',
    marginTop: 22,
  },
  menuItem: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#C8C8C8',
    marginTop: 22,
  },
  menuItemText: {
    color: '#C8C8C8',
    fontFamily: 'SF UI Text',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.024,
  },
  menuItemTextActive: {
    color: '#72A8BC',
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
});

export default BoardScreen;
