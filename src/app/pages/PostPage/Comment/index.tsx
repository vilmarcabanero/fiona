import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { CardHeader } from '@mui/material';
import moment from 'moment';

interface Props {
  comment: any;
}

export default function Comment(props: Props) {
  const avatarArray = [...props.comment.userName];
  return (
    <div
      style={{
        maxWidth: '90%',
        margin: 'auto',
        marginBottom: '0.75rem',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: red[500],
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
