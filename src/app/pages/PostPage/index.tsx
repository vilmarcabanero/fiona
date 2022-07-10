/**
 *
 * PostPage
 *
 */
import { Container } from '@mui/material';
import * as React from 'react';
import { Header } from '../Header';
import { CustomBackdrop } from 'app/components/Backdrop';
import { selectPost } from './slice/selectors';
import { useSelector } from 'react-redux';
import { Posts } from './Posts';

interface Props {}

export function PostPage(props: Props) {
  const { backdropLoading } = useSelector(selectPost);
  return (
    <React.Fragment>
      <Header>
        <Container></Container>
      </Header>
      <Container maxWidth="md" style={{ marginTop: '-2rem' }}>
        <Posts />
      </Container>
      <CustomBackdrop open={backdropLoading} />
    </React.Fragment>
  );
}
