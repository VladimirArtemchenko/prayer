import {combineReducers} from '@reduxjs/toolkit';
import columnsList from './store/columnsList';
import userInfo from './store/user';
import isLogin from './store/isLogin';

const rootReducer = combineReducers({
  columnsList,
  userInfo,
  isLogin,
});
export default rootReducer;
