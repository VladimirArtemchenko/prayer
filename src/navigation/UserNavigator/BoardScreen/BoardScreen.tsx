import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
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
import {selectColumnsList} from '../../../store/ducks/columnsList/selectors';
import Prayer from '../../../UI/Prayer/Prayer';
import SvgSettings from '../../../assets/icons/Settings';
import {makeRequest} from '../../../api/makeRequest';
import {getUserInfo} from '../../../store/ducks/user/reducer';
import {sagaActions} from '../../../store/ducks/columnsList/types';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import PrimaryButton from '../../../UI/Button';
import {PrayersListType} from '../../../store/ducks/prayerList/reducer';
import {Controller, useForm} from 'react-hook-form';
import SvgAdd from '../../../assets/icons/Add';
import Input from '../../../UI/Input';

interface BoardScreenProps {
  navigation: ProfileScreenNavigationProp;
}

const BoardScreen: React.FC<BoardScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const prayerList = useSelector(selectPrayerList);
  const columnsList = useSelector(selectColumnsList);
  const currentBoardId = useSelector(selectCurrentBoardId);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isShowed, setIsShowed] = useState(false);
  const currentBoard = useMemo(
    () => columnsList.find(column => column.id === currentBoardId),
    [columnsList, currentBoardId],
  );
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      title: currentBoard ? currentBoard.title : '',
    },
  });
  const onSubmit = (data: {title: string}) => {
    setIsEditMode(false);
    const body = {
      title: data.title,
      description: currentBoard.description,
      prayerId: currentBoard.id,
    };
    console.log(body);
    dispatch({
      type: sagaActions.CHANGE_COLUMN_SAGA,
      data: body,
      columnId: currentBoard.id,
    });
    reset();
  };
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
          dispatch({type: sagaActions.DELETE_PRAYERS_SAGA, prayerId}),
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

  const handleLogout = () => {
    makeRequest.unsetAuthorizationHeader();
    dispatch(
      getUserInfo({
        email: '',
        id: 0,
        name: '',
        token: '',
      }),
    );
  };

  const handleChangeClick = () => {
    setIsEditMode(true);
  };
  return (
    <SafeAreaView style={styles.board}>
      <View style={styles.header}>
        {isEditMode ? (
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}, fieldState: {invalid}}) => (
                <Input
                  placeholder={'Title'}
                  onChangeText={onChange}
                  value={value}
                  invalid={invalid}
                />
              )}
              name="title"
            />
            <TouchableHighlight
              style={styles.plusButton}
              onPress={handleSubmit(onSubmit)}>
              <SvgAdd />
            </TouchableHighlight>
          </View>
        ) : (
          <TouchableHighlight onPress={handleChangeClick}>
            <Text style={styles.title}>
              {currentBoard && currentBoard.title}
            </Text>
          </TouchableHighlight>
        )}
        <TouchableHighlight onPress={handleLogout} style={styles.settings}>
          <SvgSettings />
        </TouchableHighlight>
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
      <View>
        <AddPrayerForm
          navigation={navigation}
          currentBoardId={currentBoardId}
        />
      </View>
      <ScrollView>
        <SwipeListView
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

export default BoardScreen;
