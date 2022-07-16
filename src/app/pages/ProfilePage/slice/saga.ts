import { PayloadAction } from '@reduxjs/toolkit';
import createAPI from 'api/createAPI';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { profileActions as actions } from '.';

function* getUserByUsername(action: PayloadAction<string | undefined>) {
  const api = yield createAPI();

  yield put(actions.setProfileLoading(true));
  const response = yield call(api.call, 'getUserByUsername', action.payload);
  yield put(actions.setProfileLoading(false));

  if (response.ok) {
    yield put(actions.setUserByUsername(response.data));
    if (response.data) {
    } else {
    }
  }
}

export function* profileSaga() {
  yield takeLatest(actions.getUserByUsername.type, getUserByUsername);
}
