import {call, put, takeEvery} from 'redux-saga/effects';
import {enPoint} from '../../../constatns';
import {sagaActions} from './types';
import {makeRequest} from '../../../api/makeRequest';
import {PrayersListType, setPrayerList} from './reducer';
import {SagaIterator} from 'redux-saga';

export function* fetchPrayerSagaWatcher() {
  yield takeEvery(sagaActions.FETCH_PRAYERS_SAGA, fetchPrayerListSaga);
}

export function* fetchPrayerListSaga(): SagaIterator {
  try {
    const response = yield call(() => makeRequest.get(enPoint.PRAYERS_URL));
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
    yield call(() => makeRequest.post(enPoint.PRAYERS_URL, data));
    const prayers = yield call(() => makeRequest.get(enPoint.PRAYERS_URL));
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
    yield call(() => makeRequest.delete(`${enPoint.PRAYERS_URL}/${prayerId}`));
    const prayers = yield call(() => makeRequest.get(enPoint.PRAYERS_URL));
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
  data,
  prayerId,
}: {
  type: string;
  data: PrayersListType;
  prayerId: number;
}): SagaIterator {
  try {
    yield call(() =>
      makeRequest.put(`${enPoint.PRAYERS_URL}/${prayerId}`, data),
    );

    const prayers = yield call(() => makeRequest.get(enPoint.PRAYERS_URL));
    yield put(setPrayerList(prayers.data));
  } catch (error) {
    console.log('error', error);
  }
}
