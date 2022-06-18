import {call, takeEvery, put} from 'redux-saga/effects';
import {sagaActions} from './sagas-actions';
import {getColumns} from '../../api/rest/columns';
import {getColumnsList} from './reducer';
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
export function* fetchColumnsListSaga(data: {token: string; type: string}) {
  try {
    let result: ResponseGenerator = yield call(getColumns, data.token);
    yield put(getColumnsList(result.data));
  } catch (e) {
    yield put({type: 'TODO_FETCH_FAILED'});
  }
}

export function* fetchColumnsListSagaWatcher() {
  yield takeEvery(sagaActions.FETCH_COLUMNS_SAGA, fetchColumnsListSaga);
}
