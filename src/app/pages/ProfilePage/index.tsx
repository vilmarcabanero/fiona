/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useUserSlice } from '../Auth/slice';
import { Header } from '../../components/Header';
import { ProfilePageSkeleton } from './ProfilePageSkeleton';
import { useProfileSlice } from './slice';
import { selectProfile } from './slice/selectors';
import { ProfilePictureUpload } from './ProfilePictureUpload';

export function ProfilePage(props: any) {
  const { currentUser, profileLoading, isViewProfileClicked } =
    useSelector(selectProfile);

  const { actions } = useProfileSlice();
  const { actions: userActions } = useUserSlice();

  const { username } = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getUserByUsername(username));
    dispatch(userActions.getUser());
  }, [isViewProfileClicked]);

  return (
    <React.Fragment>
      <Header />

      <Container maxWidth="md">
        {profileLoading ? (
          <ProfilePageSkeleton />
        ) : (
          <div>
            {currentUser.firstName} <br /> <ProfilePictureUpload />
          </div>
        )}
      </Container>
    </React.Fragment>
  );
}
