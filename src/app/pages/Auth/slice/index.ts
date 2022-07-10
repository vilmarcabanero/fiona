import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userSaga } from './saga';
import { UserState } from './types';
import { initialRegisterPayload } from './utils';

export const initialState: UserState = {
  userDetails: {},
  loginPayload: {
    email: '',
    password: '',
  },
  loginModalOpen: false,
  registerModalOpen: false,
  isLoggedIn: localStorage.getItem('authToken')?.length ? true : false,
  isLoggingIn: true,
  registerPayload: initialRegisterPayload,
  isAuthLoading: false,
  isEmailValid: true,
  emailError: '',
  isPasswordValid: true,
  passwordError: '',
  allUsers: [],
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser() {},
    setUser(state, action: PayloadAction<any>) {
      state.userDetails = action.payload;
    },
    setLoginModalOpen(state, action: PayloadAction<any>) {
      state.loginModalOpen = action.payload;
    },
    setRegisterModalOpen(state, action: PayloadAction<any>) {
      state.registerModalOpen = action.payload;
    },
    login(state, action: PayloadAction<any>) {},
    register(state, action: PayloadAction<any>) {},
    logout() {},
    setLoginPayload(state, action: PayloadAction<any>) {
      state.loginPayload = action.payload;
    },
    setRegisterPayload(state, action: PayloadAction<any>) {
      state.registerPayload = action.payload;
    },
    setIsLoggedIn(state) {
      const isLoggedIn = localStorage.getItem('authToken')?.length
        ? true
        : false;
      state.isLoggedIn = isLoggedIn;
    },
    setIsLoggingIn(state, action: PayloadAction<any>) {
      state.isLoggingIn = action.payload;
    },
    setIsAuthLoading(state, action: PayloadAction<any>) {
      state.isAuthLoading = action.payload;
    },
    setIsEmailValid(state, action: PayloadAction<any>) {
      state.isEmailValid = action.payload;
    },
    setEmailError(state, action: PayloadAction<any>) {
      state.emailError = action.payload;
    },
    setIsPasswordValid(state, action: PayloadAction<any>) {
      state.isPasswordValid = action.payload;
    },
    setPasswordError(state, action: PayloadAction<any>) {
      state.passwordError = action.payload;
    },
    getAllUsers() {},
    setAllUsers(state, action: PayloadAction<any>) {
      state.allUsers = action.payload;
    },
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useUserSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
