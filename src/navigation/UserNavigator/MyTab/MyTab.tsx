import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyPrayers from '../MyPrayers';
import MySubscribes from '../MySubscribes';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import Input from '../../../UI/Input';
import SvgAdd from '../../../assets/icons/Add';
import SvgSettings from '../../../assets/icons/Settings';
import {useDispatch, useSelector} from 'react-redux';
import {selectColumnsList} from '../../../store/ducks/columnsList/selectors';
import {selectCurrentBoardId} from '../../../store/ducks/currentBoardId/selectors';
import {useMemo, useState} from 'react';
import {columnsSagaActions} from '../../../store/ducks/columnsList/types';
import {makeRequest} from '../../../api/makeRequest';
import {getUserInfo} from '../../../store/ducks/user/reducer';
import {route} from '../routes';
import {ProfileScreenNavigationProp} from '../../GuestNavigator/Navigator';
type Props = {
  navigation: ProfileScreenNavigationProp;
};
const MyTab: React.FC<Props> = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  const dispatch = useDispatch();
  const columnsList = useSelector(selectColumnsList);
  const currentBoardId = useSelector(selectCurrentBoardId);
  const [isEditMode, setIsEditMode] = useState(false);
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
      description: currentBoard && currentBoard.description,
      prayerId: currentBoard && currentBoard.id,
    };
    dispatch({
      type: columnsSagaActions.CHANGE_COLUMN_SAGA,
      data: body,
      columnId: currentBoard && currentBoard.id,
    });
    reset();
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
    <Tab.Navigator
      screenOptions={{swipeEnabled: false}}
      initialRouteName={'MyPrayers'}
      tabBar={props => {
        const index = props.state.index;
        return (
          <View style={styles.header}>
            {isEditMode ? (
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <Input
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
                onPress={() => navigation.navigate(route.MY_PRAYERS_ROUTE)}
                style={index === 0 ? styles.menuItemActive : styles.menuItem}>
                <Text
                  style={
                    index === 0
                      ? styles.menuItemTextActive
                      : styles.menuItemText
                  }>
                  {'My prayers'.toUpperCase()}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => navigation.navigate(route.MY_SUBSCRIBE_ROUTE)}
                style={index === 1 ? styles.menuItemActive : styles.menuItem}>
                <Text
                  style={
                    index === 1
                      ? styles.menuItemTextActive
                      : styles.menuItemText
                  }>
                  {'subscribed'.toUpperCase()}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      }}>
      <Tab.Screen name="MyPrayers" component={MyPrayers} />
      <Tab.Screen name="MySubscribes" component={MySubscribes} />
    </Tab.Navigator>
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
    backgroundColor: 'white',
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
export default MyTab;
