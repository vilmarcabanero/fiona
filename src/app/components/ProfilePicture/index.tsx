import { Person } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { selectUser } from 'app/pages/Auth/slice/selectors';
import { colors } from 'app/pages/PostPage/Post/utils';
import { useSelector } from 'react-redux';

export function ProfilePicture(props: any) {
  const { userDetails } = useSelector(selectUser);
  const avatar = userDetails.firstName?.length ? (
    userDetails.firstName.charAt(0)
  ) : (
    <Person />
  );

  const profileAvatar = props.avatar ? props.avatar : avatar;
  const diameter = props.diameter ? props.diameter : '40px';
  const bgcolor = props.bgcolor
    ? props.bgcolor
    : colors[userDetails.avatarColor];
  const fontSize = props.fontSize ? props.fontSize : '20px';

  return (
    <Avatar
      sx={{
        bgcolor,
        width: diameter,
        height: diameter,
        fontSize,
        cursor: 'pointer',
        '&:hover': { opacity: '0.8' },
      }}
      aria-label="recipe"
      {...props}
    >
      {profileAvatar}
    </Avatar>
  );
}
