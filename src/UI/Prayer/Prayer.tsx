import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {useDispatch} from 'react-redux';
import {ProfileScreenNavigationProp} from '../../navigation/UserNavigator/Navigator';
import {route} from '../../navigation/UserNavigator/routes';
import SvgUser from '../../assets/icons/User';
import SvgPrayer from '../../assets/icons/Prayer';
import SvgState from '../../assets/icons/State';
import SvgOff from '../../assets/icons/Off';
import SvgOn from '../../assets/icons/On';
import {PrayersListType} from '../../store/ducks/prayerList/reducer';
import {sagaPrayerActions} from '../../store/ducks/prayerList/types';
import {useForm, Controller} from 'react-hook-form';
import SvgAdd from '../../assets/icons/Add';
import EditInput from '../EditInput';
import {setCurrentPrayerId} from '../../store/ducks/currentPrayerId/reducer';
interface PrayerProps {
  title: string;
  navigation: ProfileScreenNavigationProp;
  checked: boolean;
  prayer: PrayersListType;
}

const Prayer: React.FC<PrayerProps> = ({
  title,
  navigation,
  checked,
  prayer,
}) => {
  const dispatch = useDispatch();
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      title: prayer.title,
    },
  });
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  const userCount = getRandomInt(50);
  const [isEditMode, setIsEditMode] = useState(false);
  const [prayerCount, setPrayerCount] = useState(getRandomInt(50));
  const onSubmit = (data: {title: string}) => {
    setIsEditMode(false);
    const body = {
      title: data.title,
      description: prayer.description,
      checked: prayer.checked,
      columnId: prayer.columnId,
    };
    dispatch({
      type: sagaPrayerActions.CHANGE_PRAYERS_SAGA,
      data: body,
      prayerId: prayer.id,
    });
    reset();
  };

  const handleIncrease = (callback: (value: number) => void, count: number) => {
    callback(count + 1);
  };

  const handleClick = () => {
    dispatch(setCurrentPrayerId(prayer.id));
    navigation.navigate(route.PPAYER_SCREEN_ROUTE);
  };
  const handleCheckboxClick = () => {
    const data = {
      title: prayer.title,
      description: prayer.description,
      checked: !prayer.checked,
      columnId: prayer.columnId,
    };
    dispatch({
      type: sagaPrayerActions.CHANGE_PRAYERS_SAGA,
      data,
      prayerId: prayer.id,
    });
  };
  const handleChangeClick = () => {
    setIsEditMode(true);
  };
  return (
    <View style={styles.prayer}>
      <View style={styles.border}>
        <SvgState />
      </View>
      <TouchableHighlight onPress={handleCheckboxClick}>
        <View style={styles.checkboxIcon}>
          {checked ? <SvgOn /> : <SvgOff />}
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={handleClick} onLongPress={handleChangeClick}>
        {isEditMode ? (
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <EditInput
                  placeholder={'Title'}
                  onChangeText={onChange}
                  value={value}
                  error={error}
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
          <Text style={styles.prayerTitle}>{title}</Text>
        )}
      </TouchableHighlight>
      <View style={styles.iconContainer}>
        <SvgUser />
        <Text style={styles.count}>{userCount}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableHighlight
          onPress={() => handleIncrease(setPrayerCount, prayerCount)}>
          <SvgPrayer fill={'#72A8BC'} />
        </TouchableHighlight>
        <Text style={styles.count}>{prayerCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  prayer: {
    backgroundColor: 'white',
    display: 'flex',
    width: '100%',
    height: 68,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    width: 3,
    height: 22,
    marginRight: 15,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxIcon: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  iconContainer: {
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    top: 8,
    left: 10,
    width: 24,
    height: 24,
  },
  prayerTitle: {
    width: 199,
    color: 'black',
    fontFamily: 'SF UI Text',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.024,
    marginRight: 5,
  },
  count: {
    textAlign: 'center',
    color: '#514D47',
    fontFamily: 'SF UI Text',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: -0.024,
    marginLeft: 5,
  },
});

export default Prayer;
