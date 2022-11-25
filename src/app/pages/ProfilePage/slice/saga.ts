import { PayloadAction } from '@reduxjs/toolkit';
import createAPI from 'api/createAPI';
import { call, put, takeLatest } from 'redux-saga/effects';
import { profileActions as actions } from '.';

function* getUserByUsername(action: PayloadAction<string | undefined>) {
  const api = yield createAPI();

  yield put(actions.setProfileLoading(true));
  const response = yield call(api.call, 'getUserByUsername', action.payload);
  yield put(actions.setProfileLoading(false));

  if (response.ok) {
    yield put(actions.setUserCurrentUser(response.data));
    if (response.data) {
    } else {
    }
  }
}

function* updateProfilePicture(action: PayloadAction<string>) {
  const api = yield createAPI();

  const response = yield call(api.call, 'updateProfilePicture', {
    profilePictureUrl: action.payload,
  });

  if (response.ok) {
    yield put(actions.setUserCurrentUser(response.data));
  }
}

export function* profileSaga() {
  yield takeLatest(actions.getUserByUsername.type, getUserByUsername);
  yield takeLatest(actions.updateProfilePicture.type, updateProfilePicture);
}
