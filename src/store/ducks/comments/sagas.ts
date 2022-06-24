import {call, put, takeEvery} from 'redux-saga/effects';
import {enPoint} from '../../../constatns';
import {sagaActions} from './types';
import {makeRequest} from '../../../api/makeRequest';
import {getComments} from './reducer';
import {SagaIterator} from 'redux-saga';

export function* fetchCommentsSagaWatcher() {
  yield takeEvery(sagaActions.FETCH_COMMENTS_SAGA, fetchCommentsSaga);
}

export function* fetchCommentsSaga(): SagaIterator {
  try {
    const response = yield call(() => makeRequest.get(enPoint.COMMENTS_URL));
    yield put(getComments(response.data));
  } catch (error) {
    console.log('error: ', error);
  }
}

export function* addCommentsSagaWatcher() {
  yield takeEvery(sagaActions.SET_COMMENTS_SAGA, addCommentsSaga);
}

export function* addCommentsSaga(data: string): SagaIterator {
  try {
    const response = yield call(() =>
      makeRequest.post(enPoint.COMMENTS_URL, data),
    );
    console.log(response);
    const comments = yield call(() => makeRequest.get(enPoint.COMMENTS_URL));
    console.log(comments);
    yield put(comments.data);
  } catch (error) {
    console.log('error: ', error);
  }
}

export function* deleteCommentsSagaWatcher() {
  yield takeEvery(sagaActions.DELETE_COMMENTS_SAGA, deleteCommentsSaga);
}

export function* deleteCommentsSaga(commentId: string): SagaIterator {
  try {
    const response = yield call(() =>
      makeRequest.delete(`${enPoint.COMMENTS_URL}/${commentId}`),
    );
    console.log(response);
    const comments = yield call(() => makeRequest.get(enPoint.COMMENTS_URL));
    console.log(comments);
    yield put(comments.data);
  } catch (error) {
    console.log('error', error);
  }
}

export function* changeCommentsSagaWatcher() {
  yield takeEvery(sagaActions.CHANGE_COMMENTS_SAGA, fetchChangeComment);
}

export function* fetchChangeComment({
  commentId,
  body,
}: {
  commentId: string;
  body: string;
}): SagaIterator {
  const data = {commentId, body};
  try {
    const response = yield call(() =>
      makeRequest.put(`${COMMENTS_URL}/${commentId}`, data),
    );
    console.log(response);
    const comments = yield call(() => makeRequest.get(enPoint.COMMENTS_URL));
    console.log(comments);
  } catch (error) {
    console.log('error', error);
  }
}
