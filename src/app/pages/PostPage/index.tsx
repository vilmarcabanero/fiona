/**
 *
 * PostPage
 *
 */
import { Container } from '@mui/material';
import * as React from 'react';
import { Header } from '../Header';
import { PostForm } from './PostForm';
import { Posts } from './Posts';

interface Props {}

export function PostPage(props: Props) {
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
        <PostForm />
        <Posts />
      </Container>
    </React.Fragment>
  );
}
