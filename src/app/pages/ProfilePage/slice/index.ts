import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { profileSaga } from './saga';
import { ProfileState } from './types';

export const initialState: ProfileState = {
  currentUser: {},
  profileLoading: false,
  isViewProfileClicked: false,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getUserByUsername(_, action: PayloadAction<string | undefined>) {},
    setUserCurrentUser(state, action: PayloadAction<any>) {
      state.currentUser = action.payload;
    },
    setProfileLoading(state, action: PayloadAction<boolean>) {
      state.profileLoading = action.payload;
    },
    updateProfilePicture(_, action: PayloadAction<string>) {},
    setIsViewProfileClicked(state, action: PayloadAction<boolean>) {
      state.isViewProfileClicked = action.payload;
    },
  },
});

export const { actions: profileActions } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useProfileSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
