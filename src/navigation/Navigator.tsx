import {useSelector} from 'react-redux';
import UserNavigator from './UserNavigator/Navigator';
import GuestNavigator from './GuestNavigator/Navigator';
import React from 'react';
import {selectUserToken} from '../store/ducks/user/selectors';

const StackApp = () => {
  const isLogin = useSelector(selectUserToken);
  return isLogin ? <UserNavigator /> : <GuestNavigator />;
};

export default StackApp;
