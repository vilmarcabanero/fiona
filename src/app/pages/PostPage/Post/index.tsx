/**
 *
 * Post
 *
 */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import Popover from '../../../components/Popover';
import Comment from '../Comment';
import PostPopoverBody from '../PostPopoverBody';
import CommentForm from '../CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { selectPost } from '../slice/selectors';
import { usePostSlice } from '../slice';
import { selectUser } from 'app/pages/Auth/slice/selectors';
import { colors } from './colors';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginRight: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  post: any;
}

export function Post(props: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const { comments } = useSelector(selectPost);
  const { userDetails, isLoggedIn, allUsers } = useSelector(selectUser);
  const { actions } = usePostSlice();
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const avatar = props.post.userName.charAt(0);

  const handleEditPost = () => {
    dispatch(actions.setIsEdit(true));
    dispatch(
      actions.setPostPayload({
        id: props.post._id,
        message: props.post.message,
      }),
    );
    dispatch(actions.setPostModalOpen(true));
  };

  const handleDeletePost = () => {
    dispatch(actions.deletePost(props.post._id));
  };

  const filteredComments = comments.filter(
    (comment: any) => comment.postId === props.post._id,
  );

  const handleLike = () => {
    dispatch(actions.likePost(props.post._id));
  };

  let avatarColor: number;

  const foundUser = allUsers.find(
    (user: any) => user._id.toString() === props.post.userId.toString(),
  );

  avatarColor = foundUser?.avatarColor;

  //Get all users, then gamit ng foundUserId, find that user, and get its avatarColor property, then set as avatarColor

  return (
    <Card sx={{ maxWidth: 'md' }} style={{ marginBottom: '1rem' }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: colors[avatarColor],
            }}
            aria-label="recipe"
          >
            {avatar}
          </Avatar>
        }
        action={
          isLoggedIn &&
          userDetails._id?.toString() === props.post.userId?.toString() && (
            <Popover
              button={<MoreVertIcon />}
              body={
                <PostPopoverBody
                  handleEditPost={handleEditPost}
                  handleDeletePost={handleDeletePost}
                />
              }
            />
          )
        }
        title={props.post.userName}
        subheader={moment(props.post.createdAt).fromNow()}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
       /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          disabled={!isLoggedIn}
          aria-label="like"
          onClick={handleLike}
        >
          <Badge badgeContent={props.post?.likers.length} color="primary">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Badge badgeContent={filteredComments.length} color="primary">
            <ChatBubbleIcon />
          </Badge>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CommentForm postId={props.post._id} />
        {filteredComments.map((comment: any) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </Collapse>
    </Card>
  );
}
