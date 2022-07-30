/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * Posts
 *
 */
import { Box } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../Post';
import { useUserSlice } from 'app/pages/Auth/slice';
import { usePostSlice } from '../slice';
import { selectPost } from '../slice/selectors';
import { PostSkeleton } from '../PostSkeleton';

interface Props {}

export function Posts(props: Props) {
  const dispatch = useDispatch();
  const { actions } = usePostSlice();
  const { actions: userActions } = useUserSlice();
  const { posts, postLoading } = useSelector(selectPost);

  React.useEffect(() => {
    dispatch(actions.getPosts());
    dispatch(actions.getComments());
    dispatch(userActions.getUser());
    dispatch(userActions.getAllUsers());
  }, []);

  return (
    <Box style={{ paddingBottom: '1.5rem' }}>
      {postLoading
        ? [...new Array(5)].map((item, index) => <PostSkeleton key={index} />)
        : posts.map((post: any) => <Post post={post} key={post._id} />)}
    </Box>
  );
}
