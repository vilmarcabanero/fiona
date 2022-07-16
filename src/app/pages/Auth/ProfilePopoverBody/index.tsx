import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Logout } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../slice/selectors';
import { ProfilePicture } from 'app/components/ProfilePicture';

export default function ProfilePopoverBody(props: any) {
  const { userDetails } = useSelector(selectUser);
  return (
    <Box
      sx={{
        width: 230,
        maxWidth: 380,
        bgcolor: 'background.paper',
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={props.handleViewProfile}>
              <ListItemIcon>
                <ProfilePicture />
              </ListItemIcon>
              <ListItemText
                primary={`${userDetails.firstName} ${userDetails.lastName}`}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={props.handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
