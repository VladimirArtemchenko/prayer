import {useSelector} from 'react-redux';
import UserNavigator from './UserNavigator/Navigator';
import GuestNavigator from './GuestNavigator/Navigator';
import React from 'react';
import {selectUserToken} from '../store/user/selectors';

const StackApp = () => {
  const isLogin = useSelector(selectUserToken);
  console.log(isLogin);
  return isLogin ? <UserNavigator /> : <GuestNavigator />;
};

export default StackApp;
