import {combineReducers} from '@reduxjs/toolkit';
import columnsList from './columnsList';
import prayerList from './prayerList';
import userInfo from './user';
import currentBoardId from './currentBoardId';
import comments from './comments';
import currentPrayerId from './currentPrayerId';
import {all} from 'redux-saga/effects';
import {fetchSignUpSagaWatcher} from './user/sagas';
import {fetchSignInSagaWatcher} from './user/sagas';
import {
  addColumnSagaWatcher,
  changeColumnSagaWatcher,
  deletingColumnSagaWatcher,
  fetchColumnsListSagaWatcher,
} from './columnsList/sagas';
import {
  addPrayerSagaWatcher,
  changePrayerSagaWatcher,
  deletingPrayerSagaWatcher,
  fetchPrayerSagaWatcher,
} from './prayerList/sagas';
import {
  addCommentsSagaWatcher,
  changeCommentsSagaWatcher,
  deleteCommentsSagaWatcher,
  fetchCommentsSagaWatcher,
} from './comments/sagas';

export const rootReducer = combineReducers({
  columnsList,
  userInfo,
  currentBoardId,
  currentPrayerId,
  prayerList,
  comments,
});

export function* rootSagas() {
  yield all([
    fetchSignUpSagaWatcher(),
    fetchSignInSagaWatcher(),
    fetchColumnsListSagaWatcher(),
    addColumnSagaWatcher(),
    deletingColumnSagaWatcher(),
    changeColumnSagaWatcher(),
    fetchPrayerSagaWatcher(),
    addPrayerSagaWatcher(),
    deletingPrayerSagaWatcher(),
    changePrayerSagaWatcher(),
    fetchCommentsSagaWatcher(),
    addCommentsSagaWatcher(),
    deleteCommentsSagaWatcher(),
    changeCommentsSagaWatcher(),
  ]);
}
