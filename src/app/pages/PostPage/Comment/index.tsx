import * as React from 'react';
import { CardHeader, Typography } from '@mui/material';
import moment from 'moment';
import { selectUser } from 'app/pages/Auth/slice/selectors';
import { useSelector } from 'react-redux';
import { colors } from '../Post/utils';
import { ProfilePicture } from 'app/components/ProfilePicture';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from 'utils/misc';

interface Props {
  comment: any;
}

export default function Comment(props: Props) {
  const { allUsers } = useSelector(selectUser);
  const avatarArray = [...props.comment.userName];
  const navigate = useNavigate();

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
        sx={{ marginTop: '-1.8rem' }}
        avatar={
          <ProfilePicture
            bgcolor={colors[avatarColor]}
            width={35}
            height={35}
            fontSize={15}
            avatar={avatarArray[0]}
            onClick={() => navigate(`/${props.comment.username}`)}
          />
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }

        title={
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => {
              navigate(`/${props.comment.username}`);
              scrollToTop();
            }}
          >
            {props.comment.userName}
          </Typography>
        }
        subheader={
          <div>
            <Typography sx={{ fontSize: '14px' }}>
              {props.comment.message}
            </Typography>
            <Typography sx={{ fontSize: '11px' }}>
              {moment(props.comment.createdAt).fromNow()}
            </Typography>
          </div>
        }
      />
    </div>
  );
}
