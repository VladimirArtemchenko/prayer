import {all} from 'redux-saga/effects';
import {fetchSignUpSagaWatcher} from './store/user/sagas';
import {fetchSignInSagaWatcher} from './store/user/sagas';
import {fetchColumnsListSagaWatcher} from './store/columnsList/sagas';

function* rootSagas() {
  yield all([
    fetchSignUpSagaWatcher(),
    fetchSignInSagaWatcher(),
    fetchColumnsListSagaWatcher(),
  ]);
}

export default rootSagas;
