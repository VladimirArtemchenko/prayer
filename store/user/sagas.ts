import {call, put, takeEvery} from 'redux-saga/effects';
import {signIn, signUp} from '../../api/rest/auth';
import {getUserInfo} from './reducer';
import {sagaActions} from './saga-actions';
import {getColumns} from '../../api/rest/columns';
import {getColumnsList} from '../columnsList/reducer';
import {setIsLogin} from '../isLogin/reducer';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
export function* fetchSignUpSaga(data: {
  data: {email: string; name: string; password: string};
  type: string;
  navigation: any;
}) {
  try {
    let result: ResponseGenerator = yield call(signUp, data.data);
    yield put(getUserInfo(result.data));
    let columns: ResponseGenerator = yield call(getColumns, result.data.token);
    yield put(getColumnsList(columns.data));
    yield put(setIsLogin(true));
    data.navigation.navigate('Desk');
  } catch (e) {
    yield put({type: 'TODO_FETCH_FAILED'});
  }
}

export function* fetchSignInSaga(data: {
  data: {email: string; password: string};
  type: string;
  navigation: any;
}) {
  try {
    let result: ResponseGenerator = yield call(signIn, data.data);
    yield put(getUserInfo(result.data));
    let columns: ResponseGenerator = yield call(getColumns, result.data.token);
    yield put(getColumnsList(columns.data));
    yield put(setIsLogin(true));
    data.navigation.navigate('Desk');
  } catch (e) {
    yield put({type: 'TODO_FETCH_FAILED'});
  }
}

export function* fetchSignUpSagaWatcher() {
  yield takeEvery(sagaActions.FETCH_SIGNUP_SAGA, fetchSignUpSaga);
}
export function* fetchSignInSagaWatcher() {
  yield takeEvery(sagaActions.FETCH_SIGNIN_SAGA, fetchSignInSaga);
}
