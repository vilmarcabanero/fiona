import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { CardHeader } from '@mui/material';
import moment from 'moment';
import { selectUser } from 'app/pages/Auth/slice/selectors';
import { useSelector } from 'react-redux';
import { colors } from '../Post/colors';

interface Props {
  comment: any;
}

export default function Comment(props: Props) {
  const { allUsers } = useSelector(selectUser);
  const avatarArray = [...props.comment.userName];

  let avatarColor: number;

  const foundUser = allUsers.find(
    (user: any) => user._id.toString() === props.comment.userId.toString(),
  );

  avatarColor = foundUser?.avatarColor;

  return (
    <div
      style={{
        maxWidth: '90%',
        margin: 'auto',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: colors[avatarColor],
              width: 35,
              height: 35,
              fontSize: 15,
            }}
            aria-label="recipe"
          >
            {avatarArray[0]}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.comment.userName}
        subheader={
          <div>
            <div>{props.comment.message}</div>
            <div style={{ fontSize: 12 }}>
              {moment(props.comment.createdAt).fromNow()}
            </div>
          </div>
        }
      />
    </div>
  );
}
