import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { postSaga } from './saga';
import { PostState } from './types';
import moment from 'moment';

export const initialState: PostState = {
  posts: [],
  comments: [],
  isEdit: false,
  postPayload: { message: '' },
  postModalOpen: false,
  postLoading: false,
  popoverOpen: false,
};

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPosts() {},
    getComments() {},
    setPosts(state, action: PayloadAction<any>) {
      const sortedPosts = action.payload.sort(
        (a: any, b: any) =>
          moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
      );
      state.posts = sortedPosts;
    },
    setComments(state, action: PayloadAction<any>) {
      const sortedComments = action.payload.sort(
        (a: any, b: any) =>
          moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
      );
      state.comments = sortedComments;
    },
    createComment(state, action: PayloadAction<any>) {},
    createPost() {},
    likePost(state, action: PayloadAction<any>) {},
    setIsEdit(state, action: PayloadAction<any>) {
      state.isEdit = action.payload;
    },
    updatePost() {},
    setPostPayload(state, action: PayloadAction<any>) {
      state.postPayload = action.payload;
    },
    setPostModalOpen(state, action: PayloadAction<any>) {
      state.postModalOpen = action.payload;
    },
    deletePost(state, action: PayloadAction<any>) {},
    setPostLoading(state, action: PayloadAction<any>) {
      state.postLoading = action.payload;
    },
    getPostsUpdate() {},
    getCommentsUpdate() {},
    hidePost(state, action: PayloadAction<any>) {},
    setPopoverOpen(state, action: PayloadAction<boolean>) {
      state.popoverOpen = action.payload;
    },
  },
});

export const { actions: postActions } = slice;

export const usePostSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: postSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = usePostSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
