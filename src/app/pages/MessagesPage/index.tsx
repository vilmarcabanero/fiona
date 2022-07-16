/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mui/material';
import { Header } from 'app/pages/Header';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useUserSlice } from '../Auth/slice';

export function MessagesPage() {
  const { actions: userActions } = useUserSlice();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.getUser());
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="md">Messages</Container>
    </React.Fragment>
  );
}
