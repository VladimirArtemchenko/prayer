import {combineReducers} from '@reduxjs/toolkit';
import columnsList from './columnsList';
import prayerList from './prayerList';
import userInfo from './user';
import currentBoardId from './currentBoardId';
import comments from './comments';

const rootReducer = combineReducers({
  columnsList,
  userInfo,
  currentBoardId,
  prayerList,
  comments,
});
export default rootReducer;
