/**
 *
 * PostPage
 *
 */
import { Container } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Auth/slice/selectors';
import { Header } from '../../components/Header';
import { PostForm } from './PostForm';
import { Posts } from './Posts';

interface Props {}

export function PostPage(props: Props) {
  const { isLoggedIn } = useSelector(selectUser);

  return (
    <React.Fragment>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          marginTop: '10px',
          maxWidth: '704px',
        }}
      >
        {isLoggedIn && <PostForm />}
        <Posts />
      </Container>
    </React.Fragment>
  );
}
