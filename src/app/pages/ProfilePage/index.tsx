/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useUserSlice } from '../Auth/slice';
import { selectUser } from '../Auth/slice/selectors';
import { Header } from '../Header';
import { ProfilePageSkeleton } from './ProfilePageSkeleton';
import { useProfileSlice } from './slice';
import { selectProfile } from './slice/selectors';

export function ProfilePage(props: any) {
  const { currentUser, profileLoading } = useSelector(selectProfile);

  const { actions } = useProfileSlice();
  const { actions: userActions } = useUserSlice();

  const { username } = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getUserByUsername(username));
    dispatch(userActions.getUser());
  }, []);

  return (
    <React.Fragment>
      <Header />

      <Container maxWidth="md">
        {profileLoading ? (
          <ProfilePageSkeleton />
        ) : (
          <div>{currentUser.firstName}</div>
        )}
      </Container>
    </React.Fragment>
  );
}
