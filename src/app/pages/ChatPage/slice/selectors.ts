import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.chatPage || initialState;

export const selectChatPage = createSelector([selectSlice], state => state);
