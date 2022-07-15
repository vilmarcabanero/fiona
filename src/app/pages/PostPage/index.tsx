/**
 *
 * PostPage
 *
 */
import { Container } from '@mui/material';
import * as React from 'react';
import { Header } from '../Header';
import { Posts } from './Posts';

interface Props {}

export function PostPage(props: Props) {
  return (
    <React.Fragment>
      <Header>
        <Container></Container>
      </Header>
      <Container maxWidth="md" style={{ marginTop: '-2rem' }}>
        <Posts />
      </Container>
    </React.Fragment>
  );
}
