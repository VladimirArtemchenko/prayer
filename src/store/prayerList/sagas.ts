import {call, put, takeEvery} from 'redux-saga/effects';
import {PRAYERS_URL} from '../../constatns';
import {sagaActions} from './types';
import {makeRequest} from '../../api/makeRequest';
import {setPrayerList} from './reducer';
import {SagaIterator} from 'redux-saga';

export function* fetchPrayerSagaWatcher() {
  yield takeEvery(sagaActions.FETCH_PRAYERS_SAGA, fetchPrayerListSaga);
}

export function* fetchPrayerListSaga(): SagaIterator {
  try {
    const response = yield call(() => makeRequest.get(PRAYERS_URL));
    yield put(setPrayerList(response.data));
  } catch (error) {
    console.log('error: ', error);
  }
}
export function* addPrayerSagaWatcher() {
  yield takeEvery(sagaActions.SET_PRAYERS_SAGA, addPrayerSaga);
}

export function* addPrayerSaga({
  type,
  title,
  description,
  checked,
  columnId,
}: {
  type: string;
  title: string;
  description: string;
  checked: boolean;
  columnId: number;
}): SagaIterator {
  const data = {title, description, checked, columnId};
  try {
    yield call(() => makeRequest.post(PRAYERS_URL, data));
    const prayers = yield call(() => makeRequest.get(PRAYERS_URL));
    yield put(setPrayerList(prayers.data));
  } catch (error) {
    console.log('error: ', error);
  }
}

export function* deletingPrayerSagaWatcher() {
  yield takeEvery(sagaActions.DELETE_PRAYERS_SAGA, deletingPrayerSaga);
}

export function* deletingPrayerSaga({
  prayerId,
  type,
}: {
  prayerId: number;
  type: string;
}): SagaIterator {
  try {
    yield call(() => makeRequest.delete(`${PRAYERS_URL}/${prayerId}`));
    const prayers = yield call(() => makeRequest.get(PRAYERS_URL));
    yield put(setPrayerList(prayers.data));
  } catch (error) {
    console.log('error', error);
  }
}

export function* changePrayerSagaWatcher() {
  yield takeEvery(sagaActions.CHANGE_PRAYERS_SAGA, changePrayerSaga);
}

export function* changePrayerSaga({
  type,
  title,
  prayerId,
}: {
  type: string;
  title: string;
  prayerId: number;
}): SagaIterator {
  const data = {title: title};
  try {
    yield call(() => makeRequest.put(`${PRAYERS_URL}/${prayerId}`, data));

    const prayers = yield call(() => makeRequest.get(PRAYERS_URL));
    yield put(setPrayerList(prayers.data));
  } catch (error) {
    console.log('error', error);
  }
}
