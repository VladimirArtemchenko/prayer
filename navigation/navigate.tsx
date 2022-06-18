import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import SignInForm from '../components/SignInForm/SignInForm';
import Desk from '../components/Desk/Desk';
import {useSelector} from 'react-redux';
import {selectIsLogin} from '../store/isLogin/selectors';

export type RootStackParamList = {
  Desk: undefined;
  SignUp: undefined;
  SignIn: undefined;
};
export type ProfileScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
function Navigate() {
  const isLogin = useSelector(selectIsLogin);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Desk"
          component={isLogin ? Desk : SignUpForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInForm}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigate;
