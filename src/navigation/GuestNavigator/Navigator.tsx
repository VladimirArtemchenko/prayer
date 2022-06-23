import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {SIGNIN_ROUTE, SIGNUP_ROUTE} from './routes';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
export type RootStackParamList = {
  SignUpForm: undefined;
  SignInForm: undefined;
};
export type ProfileScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

const GuestNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SIGNUP_ROUTE}
          component={SignUpForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SIGNIN_ROUTE}
          component={SignInForm}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GuestNavigator;
