import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Alert,
  ListRenderItemInfo,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectPrayerList} from '../../../store/ducks/prayerList/selectors';
import {selectCurrentBoardId} from '../../../store/ducks/currentBoardId/selectors';
import AddPrayerForm from '../../../UI/AddPrayerForm/AddPrayerForm';
import {ProfileScreenNavigationProp} from '../Navigator';
import Prayer from '../../../UI/Prayer/Prayer';
import {sagaPrayerActions} from '../../../store/ducks/prayerList/types';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import PrimaryButton from '../../../UI/Button';
import {PrayersListType} from '../../../store/ducks/prayerList/reducer';

interface BoardScreenProps {
  navigation: ProfileScreenNavigationProp;
  setIsActive: (value: boolean) => void;
}

const MyPrayers: React.FC<BoardScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const prayerList = useSelector(selectPrayerList);
  const currentBoardId = useSelector(selectCurrentBoardId);
  const [isShowed, setIsShowed] = useState(false);
  const currentPrayerList = useMemo(
    () =>
      prayerList.filter(
        prayer =>
          prayer.columnId === currentBoardId && prayer.checked === false,
      ),
    [prayerList, currentBoardId],
  );
  const checkedPrayerList = useMemo(
    () =>
      prayerList.filter(
        prayer => prayer.columnId === currentBoardId && prayer.checked === true,
      ),
    [prayerList, currentBoardId],
  );
  const toggleHidden = () => {
    setIsShowed(!isShowed);
  };

  const closeRow = (rowMap: RowMap<PrayersListType>, prayerId: number) => {
    if (rowMap[`${prayerId}`]) {
      rowMap[`${prayerId}`].closeRow();
    }
  };
  const deleteRow = (rowMap: RowMap<PrayersListType>, prayerId: number) => {
    closeRow(rowMap, prayerId);
    Alert.alert('Deleting', 'Deleting prayer', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          dispatch({type: sagaPrayerActions.DELETE_PRAYERS_SAGA, prayerId}),
      },
    ]);
  };
  const renderHiddenItem = (
    data: ListRenderItemInfo<PrayersListType>,
    rowMap: RowMap<PrayersListType>,
  ) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteRow(rowMap, data.item.id)}>
        <PrimaryButton size={'delete'} title={'Delete'} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.board}>
      <AddPrayerForm navigation={navigation} currentBoardId={currentBoardId} />
      <ScrollView>
        <SwipeListView
          scrollEnabled={false}
          data={currentPrayerList}
          extraData={currentPrayerList}
          rightOpenValue={-80}
          removeClippedSubviews={false}
          disableRightSwipe
          useNativeDriver={false}
          renderItem={data => (
            <Prayer
              key={data.item.id}
              title={data.item.title}
              checked={data.item.checked}
              navigation={navigation}
              prayer={data.item}
            />
          )}
          renderHiddenItem={renderHiddenItem}
        />
        {isShowed ? (
          <TouchableHighlight style={styles.smallButton} onPress={toggleHidden}>
            <PrimaryButton size={'small'} title={'Hide Answered Prayers'} />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight style={styles.smallButton} onPress={toggleHidden}>
            <PrimaryButton size={'small'} title={'Show Answered Prayers'} />
          </TouchableHighlight>
        )}
        {isShowed && (
          <SwipeListView
            scrollEnabled={false}
            data={checkedPrayerList}
            extraData={checkedPrayerList}
            rightOpenValue={-80}
            removeClippedSubviews={false}
            disableRightSwipe
            useNativeDriver={false}
            renderItem={data => (
              <Prayer
                key={data.item.id}
                title={data.item.title}
                checked={data.item.checked}
                navigation={navigation}
                prayer={data.item}
              />
            )}
            renderHiddenItem={renderHiddenItem}
          />
        )}
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
  smallButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    position: 'absolute',
    top: 25,
    left: 43,
    width: 24,
    height: 24,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
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
  deleteButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default MyPrayers;
