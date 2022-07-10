import createAPI from 'api/createAPI';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { postActions as actions } from '.';
import { selectPost } from './selectors';

function* getPosts() {
  const api = yield createAPI();

  yield put(actions.setBackdropLoading(true));
  const response = yield call(api.call, 'getAllPosts');
  yield put(actions.setBackdropLoading(false));
  if (response.ok) {
    yield put(actions.setPosts(response.data));
  }
}

function* getComments() {
  const api = yield createAPI();

  yield put(actions.setBackdropLoading(true));
  const response = yield call(api.call, 'getAllComments');
  yield put(actions.setBackdropLoading(false));

  if (response.ok) {
    yield put(actions.setComments(response.data));
  }
}

function* createComment(action: any) {
  const api = yield createAPI();

  yield put(actions.setBackdropLoading(true));
  const response = yield call(api.call, 'createComment', action.payload);
  yield put(actions.setBackdropLoading(false));

  if (response.ok) {
    yield put(actions.getComments());
  }
}

function* createPost(action: any) {
  const api = yield createAPI();

  const postState = yield select(selectPost);

  yield put(actions.setBackdropLoading(true));
  const response = yield call(api.call, 'createPost', {
    message: postState.postPayload.message,
  });
  yield put(actions.setBackdropLoading(false));

  if (response.ok) {
    yield put(actions.getPosts());
  }
}

function* likePost(action: any) {
  const api = yield createAPI();

  yield put(actions.setBackdropLoading(true));
  const response = yield call(api.call, 'likePost', { id: action.payload });
  yield put(actions.setBackdropLoading(false));

  if (response.ok) {
    yield put(actions.getPosts());
  }
}

function* updatePost(action: any) {
  const api = yield createAPI();

  const postState = yield select(selectPost);

  yield put(actions.setBackdropLoading(true));
  const response = yield call(api.call, 'updatePost', {
    id: postState.postPayload.id,
    data: {
      message: postState.postPayload.message,
    },
  });
  yield put(actions.setBackdropLoading(false));

  if (response.ok) {
    yield put(actions.getPosts());
  }
}

function* deletePost(action: any) {
  const api = yield createAPI();

  yield put(actions.setBackdropLoading(true));
  const response = yield call(api.call, 'deletePost', action.payload);
  yield put(actions.setBackdropLoading(false));

  if (response.ok) {
    yield put(actions.getPosts());
  }
}

export function* postSaga() {
  yield takeLatest(actions.getPosts.type, getPosts);
  yield takeLatest(actions.getComments.type, getComments);
  yield takeLatest(actions.createComment.type, createComment);
  yield takeLatest(actions.createPost.type, createPost);
  yield takeLatest(actions.likePost.type, likePost);
  yield takeLatest(actions.updatePost.type, updatePost);
  yield takeLatest(actions.deletePost.type, deletePost);
}
