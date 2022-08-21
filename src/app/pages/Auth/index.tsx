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

interface Props {}

export function Auth(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useUserSlice();
  const { userDetails, userLoading } = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  const handleViewProfile = () => {
    alert('Wala pa to men.');
  };

  const avatar = userDetails.firstName?.length ? (
    userDetails.firstName[0]
  ) : (
    <Person />
  );

  return (
    <ProfilePopover
      button={
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Avatar
            sx={{
              bgcolor: colors[userDetails.avatarColor],
              width: '1.5rem',
              height: '1.5rem',
              fontSize: '15px',
              marginTop: '1px',
              marginRight: '3px',
            }}
            aria-label="recipe"
          >
            {avatar}
          </Avatar>
          {userLoading ? (
            <Skeleton variant="text" width={90} />
          ) : (
            userDetails?._id && (
              <>{`${userDetails.firstName} ${userDetails.lastName}`}</>
            )
          )}
        </Box>
      }
      body={
        <ProfilePopoverBody
          handleLogout={handleLogout}
          handleViewProfile={handleViewProfile}
        />
      }
    />
  );
}
