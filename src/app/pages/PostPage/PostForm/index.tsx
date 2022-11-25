/**
 *
 * PostForm
 *
 */
import { Close, Public } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CustomModal from 'app/components/Modal';
import { ProfilePicture } from 'app/components/ProfilePicture';
import { selectUser } from 'app/pages/Auth/slice/selectors';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePostSlice } from '../slice';
import { selectPost } from '../slice/selectors';
import { style } from './styles';

interface Props {}

export function PostForm(props: Props) {
  // const [postValue, setPostValue] = React.useState('');
  const { actions } = usePostSlice();
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(actions.setPostModalOpen(true));
  };
  const handleClose = () => {
    dispatch(actions.setPostModalOpen(false));
    dispatch(actions.setPostPayload({}));
    dispatch(actions.setIsEdit(false));
  };

  const { isEdit, postModalOpen, postPayload } = useSelector(selectPost);
  const { userDetails } = useSelector(selectUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      actions.setPostPayload({ ...postPayload, message: event.target.value }),
    );
  };

  const handleCreatePost = (e: any) => {
    e.preventDefault();
    dispatch(actions.setPostModalOpen(false));

    if (isEdit) {
      dispatch(actions.updatePost());
    } else {
      dispatch(actions.createPost());
    }

    dispatch(actions.setPostPayload({}));
    dispatch(actions.setIsEdit(false));
  };

  const ModalButton = (
    <Card
      sx={{
        maxWidth: 'md',
        border: '1px solid #e1e1e1',
        marginBottom: '1rem',
        marginTop: '1rem',
      }}
      variant="outlined"
    >
      <CardContent sx={{ marginBottom: '-10px', display: 'flex' }}>
        <ProfilePicture />
        <TextField
          value=""
          onClick={handleOpen}
          fullWidth
          placeholder="Post your memories here."
          size="small"
          sx={{ cursor: 'pointer', borderRadius: '20px', marginLeft: '10px' }}
        />
      </CardContent>
      {/* <Divider />
      <CardContent sx={{ marginBottom: '-8px' }}>Card actions</CardContent> */}
    </Card>
  );

  const modalProps = {
    button: ModalButton,
    style,
    open: postModalOpen,
    handleClose,
    handleOpen,
  };

  return (
    <CustomModal modal={modalProps}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleCreatePost}
      >
        <Box
          style={{ position: 'relative', margin: '12px', textAlign: 'center' }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {isEdit ? 'Edit' : 'Write'} post
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '-3px',
              right: 0,
              backgroundColor: 'rgba(237,237,237, 0.75)',
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', margin: '12px' }}>
          <ProfilePicture />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '10px',
            }}
          >
            <Typography>{`${userDetails.firstName} ${userDetails.lastName}`}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Public
                sx={{
                  fontSize: '12px',
                  marginRight: '3px',
                  marginBottom: '2.5px',
                }}
              />
              <Typography variant="body2" sx={{ fontSize: '12px' }}>
                Public
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ margin: '12px' }}>
          <TextField
            id="post-write"
            label=""
            placeholder="Post your memories here."
            multiline
            minRows={3}
            variant="standard"
            value={postPayload.message}
            // fullWidth
            sx={{ width: '100%' }}
            InputProps={{ style: { fontSize: '30px' } }}
            InputLabelProps={{ style: { fontSize: '30px' } }}
            onChange={handleChange}
            onKeyUp={e => {
              if (e.key === 'Enter' && e.shiftKey) {
                handleCreatePost(e);
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{
              textTransform: 'none',
              marginTop: '1rem',
            }}
          >
            {isEdit ? 'Save' : 'Post'}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
}
