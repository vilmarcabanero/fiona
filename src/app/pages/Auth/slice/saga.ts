import createAPI from 'api/createAPI';
import { ApiResponse } from 'apisauce';
import { User } from 'db/models/User';
import {
  _getAllUsers,
  _getUser,
  _setAllUsers,
  _setUser,
} from 'db/controllers/users.controller';
import jwtDecode from 'jwt-decode';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { socket, SocketEvents } from 'utils/socket';
import { userActions as actions } from '.';
import {
  EMAIL_ALREADY_REGISTERED,
  EMAIL_NOT_REGISTERED,
  PASSWORD_INCORRECT,
} from '../validation';
import { selectUser } from './selectors';
import { AuthResponse, JwtDecode, UserState } from './types';
import { initialLoginPayload, initialRegisterPayload } from './utils';

function* getUser() {
  const token = localStorage.getItem('authToken');
  let decoded: JwtDecode;
  let cachedUser: User | null = null;
  if (token) {
    decoded = jwtDecode(token);
    cachedUser = yield _getUser(decoded._id);
  }

  if (cachedUser) {
    yield put(actions.setUser(cachedUser));
  } else {
    const api = yield createAPI();

    yield put(actions.setUserLoading(true));
    const response: ApiResponse<User> = yield call(api.call, 'getUser');
    yield put(actions.setUserLoading(false));
    if (response.ok) {
      yield put(actions.setUser(response.data));
      if (response.data && response.data._id)
        yield _setUser(response.data._id, response.data);
    }
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
  const userState: UserState = yield select(selectUser);

  const api = yield createAPI();

  yield put(actions.setIsAuthLoading(true));
  const response: ApiResponse<AuthResponse> = yield call(
    api.call,
    'register',
    action.payload,
  );
  yield put(actions.setIsAuthLoading(false));
  if (response.ok) {
    const newUsers = [...userState.allUsers, response.data?.user];
    yield put(actions.setRegisterModalOpen(false));
    yield put(actions.setIsLoggingIn(true));
    yield put(actions.setRegisterPayload(initialRegisterPayload));
    if (response.data)
      yield localStorage.setItem('authToken', response.data.accessToken);
    yield put(actions.setIsLoggedIn());
    yield put(actions.getUser());
    socket().emit(SocketEvents.send_all_users, newUsers);
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
  const cachedAllUsers = yield _getAllUsers();

  if (cachedAllUsers) {
    yield put(actions.setAllUsers(cachedAllUsers));
  } else {
    const api = yield createAPI();

    const response: ApiResponse<User[]> = yield call(api.call, 'getAllUsers');
    if (response.ok) {
      yield put(actions.setAllUsers(response.data));
      if (response.data) yield _setAllUsers(response.data);
    }
  }
}

export function* userSaga() {
  yield takeLatest(actions.getUser.type, getUser);
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.logout.type, logout);
  yield takeLatest(actions.register.type, register);
  yield takeLatest(actions.getAllUsers.type, getAllUsers);
}
