/**
 *
 * Auth
 *
 */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePopover from './ProfilePopover';
import ProfilePopoverBody from './ProfilePopoverBody';
import { useUserSlice } from './slice';
import { selectUser } from './slice/selectors';
import { useNavigate } from 'react-router-dom';
import { usePostSlice } from '../PostPage/slice';
import { scrollToTop } from 'utils/misc';
import { ProfilePicture } from 'app/components/ProfilePicture';
import { useProfileSlice } from '../ProfilePage/slice';
import { selectProfile } from '../ProfilePage/slice/selectors';

interface Props {}

export function Auth(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useUserSlice();
  const { actions: postActions } = usePostSlice();
  const { userDetails } = useSelector(selectUser);
  const { actions: profileActions } = useProfileSlice();
  const { isViewProfileClicked } = useSelector(selectProfile);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  const handleViewProfile = () => {
    dispatch(postActions.setPopoverOpen(true));
    navigate(`/${userDetails.username}`);
    scrollToTop();
    dispatch(profileActions.setIsViewProfileClicked(!isViewProfileClicked));
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
