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
import { PostSkeleton } from '../PostSkeleton';
import { ISocketUser, socket, SocketEvents } from 'utils/socket';
import * as db from 'db/controllers/posts.controller';
import { _setComments } from 'db/controllers/comments.controller';
import { _setAllUsers, _setUser } from 'db/controllers/users.controller';
import { Post as IPost } from 'db/models/Post';

interface Props {}

export function Posts(props: Props) {
  const dispatch = useDispatch();
  const { actions } = usePostSlice();
  const { actions: userActions } = useUserSlice();
  const { posts, postLoading } = useSelector(selectPost);
  const [onlineStatus, setOnlineStatus] = React.useState(true);

  React.useEffect(() => {
    dispatch(actions.getPosts());
    dispatch(actions.getComments());
    dispatch(userActions.getUser());
    dispatch(userActions.getAllUsers());
    window.addEventListener('offline', () => {
      setOnlineStatus(!onlineStatus);
    });
    window.addEventListener('online', () => {
      setOnlineStatus(!onlineStatus);
    });
  }, [onlineStatus]);

  // Receive data from socket server.
  React.useEffect(() => {
    socket().on(SocketEvents.receive_posts, (data: IPost[]) => {
      dispatch(actions.setPosts([...data]));
      db._setPosts([...data]);
    });
    socket().on(SocketEvents.receive_comments, data => {
      dispatch(actions.setComments([...data]));
      _setComments([...data]);
    });
    socket().on(SocketEvents.receive_all_users, data => {
      dispatch(userActions.setAllUsers([...data]));
      _setAllUsers([...data]);
    });
    socket().on(SocketEvents.receive_user, (data: ISocketUser) => {
      dispatch(userActions.setUser(data.user));
      _setUser(data.userId, data.user);
    });
  }, [socket]);

  return (
    <Container style={{ paddingBottom: '1.5rem' }}>
      {postLoading
        ? [...new Array(5)].map((item, index) => <PostSkeleton key={index} />)
        : posts.map((post: any) => <Post post={post} key={post._id} />)}
    </Container>
  );
}
