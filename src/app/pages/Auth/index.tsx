/**
 *
 * Auth
 *
 */
import * as React from 'react';
import { Person } from '@mui/icons-material';
import { Avatar, Box, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePopover from './ProfilePopover';
import ProfilePopoverBody from './ProfilePopoverBody';
import { useUserSlice } from './slice';
import { selectUser } from './slice/selectors';
import { colors } from '../PostPage/Post/utils';
import { useNavigate } from 'react-router-dom';
import { usePostSlice } from '../PostPage/slice';
import { selectPost } from '../PostPage/slice/selectors';
import { scrollToTop } from 'utils/misc';
import { ProfilePicture } from 'app/components/ProfilePicture';

interface Props {}

export function Auth(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useUserSlice();
  const { actions: postActions } = usePostSlice();
  const { userDetails, userLoading } = useSelector(selectUser);
  const { isEdit } = useSelector(selectPost);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  const handleViewProfile = () => {
    dispatch(postActions.setPopoverOpen(true));
    navigate(`/${userDetails.username}`);
    scrollToTop();
  };

  return (
    <ProfilePopover
      button={<ProfilePicture />}
      body={
        <ProfilePopoverBody
          handleLogout={handleLogout}
          handleViewProfile={handleViewProfile}
        />
      }
    />
  );
}
