import {call, put, takeEvery} from 'redux-saga/effects';
import {COLUMNS_URL} from '../../constatns';
import {sagaActions} from './types';
import {makeRequest} from '../../api/makeRequest';
import {getColumnsList} from './reducer';
import {SagaIterator} from 'redux-saga';

export function* fetchColumnsListSagaWatcher() {
  yield takeEvery(sagaActions.FETCH_COLUMNS_SAGA, fetchColumnsListSaga);
}

export function* fetchColumnsListSaga(): SagaIterator {
  try {
    const response = yield call(() => makeRequest.get(COLUMNS_URL));
    yield put(getColumnsList(response.data));
  } catch (error) {
    console.log('error: ', error);
  }
}

export function* addColumnSagaWatcher() {
  yield takeEvery(sagaActions.SET_COLUMN_SAGA, addColumnSaga);
}

export function* addColumnSaga({
  type,
  title,
  description,
  prayerId,
}: {
  type: string;
  title: string;
  description: string;
  prayerId: string;
}): SagaIterator {
  try {
    const data = {title, description, prayerId};
    console.log(data);
    const response = yield call(() => makeRequest.post(COLUMNS_URL, data));
    console.log(response);
    const columns = yield call(() => makeRequest.get(COLUMNS_URL));
    console.log(columns);
    yield put(getColumnsList(columns.data));
  } catch (error) {
    console.log('error: ', error);
  }
}

export function* deletingColumnSagaWatcher() {
  yield takeEvery(sagaActions.DELETE_COLUMN_SAGA, deletingColumnSaga);
}

export function* deletingColumnSaga({
  currentId,
  type,
}: {
  currentId: number;
  type: string;
}): SagaIterator {
  try {
    yield call(() => makeRequest.delete(`${COLUMNS_URL}/${currentId}`));
    const columns = yield call(() => makeRequest.get(COLUMNS_URL));
    yield put(getColumnsList(columns.data));
  } catch (error) {
    console.log('error: ', error);
  }
}
export function* changeColumnSagaWatcher() {
  yield takeEvery(sagaActions.CHANGE_COLUMN_SAGA, changeColumnsSaga);
}

export function* changeColumnsSaga(data: {type: string}): SagaIterator {
  try {
    yield call(() => makeRequest.put(`${COLUMNS_URL}/${data}`, data));
    const columns = yield call(() => makeRequest.get(COLUMNS_URL));
    yield put(getColumnsList(columns.data));
  } catch (error) {
    console.log('error: ', error);
  }
}
