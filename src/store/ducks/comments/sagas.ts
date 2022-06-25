import {call, put, takeEvery} from 'redux-saga/effects';
import {enPoint} from '../../../constatns';
import {sagaCommentActions} from './types';
import {makeRequest} from '../../../api/makeRequest';
import {CommentType, getComments} from './reducer';
import {SagaIterator} from 'redux-saga';
import {AxiosResponse} from 'axios';

export function* fetchCommentsSagaWatcher() {
  yield takeEvery(sagaCommentActions.FETCH_COMMENTS_SAGA, fetchCommentsSaga);
}

export function* fetchCommentsSaga() {
  try {
    const response: AxiosResponse<CommentType[]> = yield call(() =>
      makeRequest.get(enPoint.COMMENTS_URL),
    );
    yield put(getComments(response.data));
  } catch (error) {
    console.log('error: ', error);
  }
}

export function* addCommentsSagaWatcher() {
  yield takeEvery(sagaCommentActions.SET_COMMENTS_SAGA, addCommentsSaga);
}

export function* addCommentsSaga({
  body,
  created,
  prayerId,
}: {
  body: string;
  created: string;
  prayerId: number;
  type: string;
}): SagaIterator {
  try {
    const data = {body: body, created: created, prayerId: prayerId};
    console.log(data);
    const res = yield call(() => makeRequest.post(enPoint.COMMENTS_URL, data));
    console.log(res);
    const comments = yield call(() => makeRequest.get(enPoint.COMMENTS_URL));
    yield put(getComments(comments.data));
  } catch (error) {
    console.log('error: ', error);
  }
}

export function* deleteCommentsSagaWatcher() {
  yield takeEvery(sagaCommentActions.DELETE_COMMENTS_SAGA, deleteCommentsSaga);
}

export function* deleteCommentsSaga(data: {
  id: string;
  type: string;
}): SagaIterator {
  try {
    yield call(() => makeRequest.delete(`${enPoint.COMMENTS_URL}/${data.id}`));
    const comments = yield call(() => makeRequest.get(enPoint.COMMENTS_URL));
    yield put(getComments(comments.data));
  } catch (error) {
    console.log('error', error);
  }
}

export function* changeCommentsSagaWatcher() {
  yield takeEvery(sagaCommentActions.CHANGE_COMMENTS_SAGA, fetchChangeComment);
}

export function* fetchChangeComment(body: {
  body: string;
  prayerId: number;
  created: string;
  id: number;
  type: string;
}): SagaIterator {
  try {
    console.log(body);
    const response = yield call(() =>
      makeRequest.put(`${enPoint.COMMENTS_URL}/${body.id}`, body.body),
    );
    console.log(response);
    const comments = yield call(() => makeRequest.get(enPoint.COMMENTS_URL));
    console.log(comments);
  } catch (error) {
    console.log('error', error);
  }
}
