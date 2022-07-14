/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * Posts
 *
 */
import { Container } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../Post';
import { useUserSlice } from 'app/pages/Auth/slice';
import { usePostSlice } from '../slice';
import { selectPost } from '../slice/selectors';

interface Props {}

export function Posts(props: Props) {
  const dispatch = useDispatch();
  const { actions } = usePostSlice();
  const { actions: userActions } = useUserSlice();
  const { posts } = useSelector(selectPost);

  React.useEffect(() => {
    dispatch(actions.getPosts());
    dispatch(actions.getComments());
    dispatch(userActions.getUser());
    dispatch(userActions.getAllUsers());
  }, []);

  // React.useEffect(() => {
  //   setInterval(() => {
  //     dispatch(actions.getPostsUpdate());
  //     dispatch(actions.getCommentsUpdate());
  //   }, 2000);
  // }, []);

  return (
    <Container style={{ paddingBottom: '1.5rem' }}>
      {posts.map((post: any) => (
        <Post post={post} key={post._id} />
      ))}
    </Container>
  );
}
