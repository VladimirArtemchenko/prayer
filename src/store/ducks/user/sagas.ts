import {makeRequest} from '../../../api/makeRequest';
import {call, put, takeEvery} from 'redux-saga/effects';
import {enPoint} from '../../../constatns';
import {sagaActions} from './types';
import {getUserInfo} from './reducer';
import {SagaIterator} from 'redux-saga';
import {SignUpData, SignInData} from './types';

export function* fetchSignUpSagaWatcher() {
  yield takeEvery(sagaActions.FETCH_SIGNUP_SAGA, fetchSignUpSaga);
}

export function* fetchSignUpSaga(data: {
  data: SignUpData;
  type: string;
}): SagaIterator {
  console.log(data);
  try {
    const response = yield call(() =>
      makeRequest.post(enPoint.SIGNUP_URL, data.data),
    );
    console.log(response);
    yield put(getUserInfo(response.data));
    console.log(response.data);
    makeRequest.setAuthorizationHeader(response.data.token);
  } catch (error) {
    console.log(error);
  }
}

export function* fetchSignInSagaWatcher() {
  yield takeEvery(sagaActions.FETCH_SIGNIN_SAGA, fetchSignInSaga);
}

export function* fetchSignInSaga(data: {
  data: SignInData;
  type: string;
}): SagaIterator {
  try {
    const response = yield call(() =>
      makeRequest.post(enPoint.SIGNIN_URL, data.data),
    );
    yield put(getUserInfo(response.data));
    makeRequest.setAuthorizationHeader(response.data.token);
  } catch (error) {
    console.log(error);
  }
}
