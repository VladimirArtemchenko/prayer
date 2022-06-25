import {call, put, takeEvery} from 'redux-saga/effects';
import {enPoint} from '../../../constatns';
import {columnsSagaActions} from './types';
import {makeRequest} from '../../../api/makeRequest';
import {ColumnListType, getColumnsList} from './reducer';
import {SagaIterator} from 'redux-saga';

export function* fetchColumnsListSagaWatcher() {
  yield takeEvery(columnsSagaActions.FETCH_COLUMNS_SAGA, fetchColumnsListSaga);
}

export function* fetchColumnsListSaga(): SagaIterator {
  try {
    const response = yield call(() => makeRequest.get(enPoint.COLUMNS_URL));
    yield put(getColumnsList(response.data));
  } catch (error) {
    console.log('error: ', error);
  }
}

export function* addColumnSagaWatcher() {
  yield takeEvery(columnsSagaActions.SET_COLUMN_SAGA, addColumnSaga);
}

export function* addColumnSaga({
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
    yield call(() => makeRequest.post(enPoint.COLUMNS_URL, data));
    const columns = yield call(() => makeRequest.get(enPoint.COLUMNS_URL));
    yield put(getColumnsList(columns.data));
  } catch (error) {
    console.log('error: ', error);
  }
}

export function* deletingColumnSagaWatcher() {
  yield takeEvery(columnsSagaActions.DELETE_COLUMN_SAGA, deletingColumnSaga);
}

export function* deletingColumnSaga({
  currentId,
}: {
  currentId: number;
  type: string;
}): SagaIterator {
  try {
    yield call(() => makeRequest.delete(`${enPoint.COLUMNS_URL}/${currentId}`));
    const columns = yield call(() => makeRequest.get(enPoint.COLUMNS_URL));
    yield put(getColumnsList(columns.data));
  } catch (error) {
    console.log('error: ', error);
  }
}
export function* changeColumnSagaWatcher() {
  yield takeEvery(columnsSagaActions.CHANGE_COLUMN_SAGA, changeColumnsSaga);
}

export function* changeColumnsSaga({
  data,
  columnId,
}: {
  type: string;
  data: ColumnListType;
  columnId: number;
}): SagaIterator {
  try {
    yield call(() =>
      makeRequest.put(`${enPoint.COLUMNS_URL}/${columnId}`, data),
    );
    const columns = yield call(() => makeRequest.get(enPoint.COLUMNS_URL));
    yield put(getColumnsList(columns.data));
  } catch (error) {
    console.log('error: ', error);
  }
}
