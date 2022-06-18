// import {call, put, takeEvery} from 'redux-saga/effects';
// import , signUp} from '../../api/rest/auth';
// import {getUserInfo} from './reducer';
// import {sagaActions} from './saga-actions';
// import {getColumns} from '../../api/rest/columns';
// import {getColumnsList} from '../columnsList/reducer';
//
// export function* fetchSignUpSaga(data: {
//   email: string;
//   name: string;
//   password: string;
// }) {
//   try {
//     let result = yield call(signUp, data.data);
//     yield put(getUserInfo(result.data));
//     let columns = yield call(getColumns, result.data.token);
//     yield put(getColumnsList(columns.data));
//   } catch (e) {
//     yield put({type: 'TODO_FETCH_FAILED'});
//   }
// }
//
// export default function* fetchSignUpSagaWatcher() {
//   yield takeEvery(sagaActions.FETCH_ISLOGIN_SAGA, fetchSignUpSaga);
// }
