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
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RecommendRoundedIcon from '@mui/icons-material/RecommendRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import Popover from '../../../components/Popover';
import Comment from '../Comment';
import PostPopoverBody from '../PostPopoverBody';
import CommentForm from '../CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Divider, Box, Grid } from '@mui/material';
import { selectPost } from '../slice/selectors';
import { usePostSlice } from '../slice';
import { selectUser } from 'app/pages/Auth/slice/selectors';
import { colors } from './utils';
import { ProfilePicture } from 'app/components/ProfilePicture';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from 'utils/misc';
import { selectProfile } from 'app/pages/ProfilePage/slice/selectors';
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
  const { currentUser } = useSelector(selectProfile);
  const { actions } = usePostSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditPost = () => {
    dispatch(actions.setIsEdit(true));
    dispatch(actions.setPopoverOpen(true));
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

  const handleHidePost = () => {
    dispatch(actions.hidePost(props.post._id));
  };

  const filteredComments = comments.filter(
    (comment: any) => comment.postId === props.post._id,
  );

  const handleLike = () => {
    dispatch(actions.likePost(props.post._id));
  };

  //Get all users, then gamit ng foundUserId, find that user, and get its avatarColor property, then set as avatarColor

  const selfLiked = props.post.likers.find(
    (liker: any) => liker.toString() === userDetails._id?.toString(),
  );

  let avatarColor: number;

  const foundUser = allUsers.find(
    (user: any) => user._id.toString() === props.post.userId.toString(),
  );

  avatarColor = foundUser?.avatarColor;

  return (
    <Card
      sx={{ maxWidth: 'md', border: '1px solid #e1e1e1' }}
      style={{ marginBottom: '1rem', paddingBottom: '0rem' }}
      variant="outlined"
    >
      {/* sx={{ marginBottom: '-25px' }} */}
      <CardHeader
        // sx={{ p: 0, '&:last-child': { pb: 0 } }}
        avatar={
          <ProfilePicture
            bgcolor={colors[avatarColor]}
            onClick={() => navigate(`/${props.post.username}`)}
          />
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
                  handleHidePost={handleHidePost}
                />
              }
            />
          )
        }
        title={
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => {
              navigate(`/${currentUser.username}`);
              scrollToTop();
            }}
          >
            {props.post.userName}
          </Typography>
        }
        subheader={
          <Typography sx={{ fontSize: '11px' }}>
            {moment(props.post.createdAt).fromNow()}
          </Typography>
        }
      />
      {/* sx={{ marginBottom: '-20px' }}  */}
      <CardContent
        sx={{
          p: 0,
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '&:last-child': { pb: 0 },
          marginTop: '-0.6rem',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: '20px' }}
        >
          {props.post.message}
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          sx={{ marginTop: '-1rem' }}
        >
          {props.post?.likers.length ? (
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
              }}
            >
              <RecommendRoundedIcon
                sx={{ color: '#2078F4', marginRight: '5px', fontSize: '23px' }}
              />
              <Typography>{props.post?.likers.length}</Typography>
            </Grid>
          ) : (
            <Grid item xs={6}></Grid>
          )}
          {filteredComments?.length ? (
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                height: '24px',
              }}
              direction="row"
              justifyContent="flex-end"
            >
              <Typography
                sx={{
                  fontSize: '13px',

                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                onClick={handleExpandClick}
              >
                {filteredComments?.length}{' '}
                {filteredComments?.length === 1 ? 'Comment' : 'Comments'}
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={6}></Grid>
          )}
        </Grid>
      </CardContent>
      {/* sx={{ marginBottom: '-40px' }} */}
      <CardContent
        sx={{
          p: 0,
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '&:last-child': { pb: 0 },
        }}
      >
        <Divider sx={{ marginTop: '0.2rem' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            disabled={!isLoggedIn}
            aria-label="like"
            onClick={handleLike}
            style={
              selfLiked?.length && {
                color: `${selfLiked?.length && '#2078F4'}`,
              }
            }
            sx={{ width: '50%' }}
            disableRipple
          >
            {/* <Badge
            badgeContent={props.post?.likers.length}
            color="primary"
          ></Badge> */}
            <Box>
              <ThumbUpOutlinedIcon sx={{ marginRight: '10px' }} />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                Like
              </Typography>
            </Box>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ width: '50%' }}
            disableRipple
          >
            {/* <Badge badgeContent={filteredComments.length} color="primary">
             
            </Badge> */}
            <ChatBubbleOutlineOutlinedIcon sx={{ marginRight: '10px' }} />
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              Comment
            </Typography>
          </ExpandMore>
        </Box>

        {/* <Divider /> */}
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CommentForm postId={props.post._id} />
        {filteredComments.map((comment: any) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </Collapse>
    </Card>
  );
}
