import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {route} from './routes';
import Desk from './Desk';
import AddColumnForm from './AddColumnForm';
import PrayerScreen from './PrayerScreen';
import MyTab from './MyTab';
export type RootStackParamList = {
  Desk: undefined;
  AddColumnForm: undefined;
  MyTab: undefined;
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
          name={route.DESK_ROUTE}
          component={Desk}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={route.ADD_COLUMN_ROUTE}
          component={AddColumnForm}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name={route.BOARD_SCREEN_ROUTE}
          component={MyTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={route.PPAYER_SCREEN_ROUTE}
          component={PrayerScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GuestNavigator;
