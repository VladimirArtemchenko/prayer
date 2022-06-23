import {all} from 'redux-saga/effects';
import {fetchSignUpSagaWatcher} from '../user/sagas';
import {fetchSignInSagaWatcher} from '../user/sagas';
import {
  addColumnSagaWatcher,
  changeColumnSagaWatcher,
  deletingColumnSagaWatcher,
  fetchColumnsListSagaWatcher,
} from '../columnsList/sagas';
import {
  addPrayerSagaWatcher,
  changePrayerSagaWatcher,
  deletingPrayerSagaWatcher,
  fetchPrayerSagaWatcher,
} from '../prayerList/sagas';

function* rootSagas() {
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
  ]);
}

export default rootSagas;
