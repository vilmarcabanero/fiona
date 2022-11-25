import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
} from '@mui/material';
import { selectUser } from 'app/pages/Auth/slice/selectors';
import { useSelector } from 'react-redux';

export function PostSkeleton() {
  const { isLoggedIn } = useSelector(selectUser);
  return (
    <Card
      sx={{
        maxWidth: 'md',
        '&:first-of-type': {
          marginTop: !isLoggedIn ? '1rem' : '',
        },
      }}
      style={{ marginBottom: '1rem', paddingBottom: '1rem' }}
    >
      <CardHeader
        avatar={
          <Skeleton variant="circular">
            <Avatar></Avatar>
          </Skeleton>
        }
        title={<Skeleton width={100}></Skeleton>}
        subheader={<Skeleton width={70}></Skeleton>}
      />
      <CardContent>
        <Skeleton sx={{ width: '100%' }}></Skeleton>
      </CardContent>
      <CardActions disableSpacing>
        <Skeleton
          variant="circular"
          width={28}
          height={28}
          style={{ marginRight: '0.8rem', marginLeft: '0.5rem' }}
        />
        <Skeleton variant="circular" width={28} height={28} />
      </CardActions>
    </Card>
  );
}
