import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.post || initialState;

export const selectPost = createSelector([selectSlice], state => state);
