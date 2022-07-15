import createAPI from 'api/createAPI';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userActions as actions } from '.';
import {
  EMAIL_ALREADY_REGISTERED,
  EMAIL_NOT_REGISTERED,
  PASSWORD_INCORRECT,
} from '../validation';
import { initialLoginPayload, initialRegisterPayload } from './utils';

function* getUser() {
  const api = yield createAPI();

  yield put(actions.setUserLoading(true));
  const response = yield call(api.call, 'getUser');
  yield put(actions.setUserLoading(false));
  if (response.ok) {
    yield put(actions.setUser(response.data));
  }
}

function* login(action: any) {
  const api = yield createAPI();

  yield put(actions.setIsAuthLoading(true));
  const response = yield call(api.call, 'login', action.payload);
  yield put(actions.setIsAuthLoading(false));
  if (response.ok) {
    yield put(actions.setLoginModalOpen(false));
    yield put(actions.setIsLoggingIn(true));
    yield put(actions.setLoginPayload(initialLoginPayload));
    yield localStorage.setItem('authToken', response.data.accessToken);
    yield put(actions.setIsLoggedIn());
    yield put(actions.getUser());
  } else {
    if (!response.data) {
      alert('Something went wrong.');
    } else if (response.data.message === 'not-yet-registered') {
      yield put(actions.setIsEmailValid(false));
      yield put(actions.setEmailError(EMAIL_NOT_REGISTERED));
    } else if (response.data.message === 'password-incorrect') {
      yield put(actions.setIsPasswordValid(false));
      yield put(actions.setPasswordError(PASSWORD_INCORRECT));
    }
  }
}

function* register(action: any) {
  const api = yield createAPI();

  yield put(actions.setIsAuthLoading(true));
  const response = yield call(api.call, 'register', action.payload);
  yield put(actions.setIsAuthLoading(false));
  if (response.ok) {
    yield put(actions.setRegisterModalOpen(false));
    yield put(actions.setIsLoggingIn(true));
    yield put(actions.setRegisterPayload(initialRegisterPayload));
    yield localStorage.setItem('authToken', response.data.accessToken);
    yield put(actions.setIsLoggedIn());
    yield put(actions.getUser());
  } else {
    if (!response.data) {
      alert('Something went wrong.');
    } else if (response.data.message === 'already-registered') {
      yield put(actions.setIsEmailValid(false));
      yield put(actions.setEmailError(EMAIL_ALREADY_REGISTERED));
    }
  }
}

function* logout() {
  yield localStorage.removeItem('authToken');
  yield put(actions.setIsLoggedIn());
}

function* getAllUsers() {
  const api = yield createAPI();

  const response = yield call(api.call, 'getAllUsers');
  if (response.ok) {
    yield put(actions.setAllUsers(response.data));
  }
}

export function* userSaga() {
  yield takeLatest(actions.getUser.type, getUser);
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.logout.type, logout);
  yield takeLatest(actions.register.type, register);
  yield takeLatest(actions.getAllUsers.type, getAllUsers);
}
