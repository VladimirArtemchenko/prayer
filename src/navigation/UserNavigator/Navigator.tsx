import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  ADD_COLUMN_ROUTE,
  DESK_ROUTE,
  BOARD_SCREEN_ROUTE,
  PPAYER_SCREEN_ROUTE,
} from './routes';
import Desk from './Desk';
import AddColumnForm from './AddColumnForm';
import BoardScreen from './BoardScreen';
import PrayerScreen from './PrayerScreen';
export type RootStackParamList = {
  Desk: undefined;
  AddColumnForm: undefined;
  BoardScreen: undefined;
  PrayerScreen: undefined;
};
export type ProfileScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

const GuestNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={DESK_ROUTE}
          component={Desk}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ADD_COLUMN_ROUTE}
          component={AddColumnForm}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name={BOARD_SCREEN_ROUTE}
          component={BoardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={PPAYER_SCREEN_ROUTE}
          component={PrayerScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GuestNavigator;
