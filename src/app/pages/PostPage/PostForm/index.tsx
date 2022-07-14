/**
 *
 * PostForm
 *
 */
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CustomModal from 'app/components/Modal';
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

  const { isEdit, postModalOpen, postPayload, buttonLoading } =
    useSelector(selectPost);

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

  const modalProps = {
    button: 'Write a post',
    style,
    open: postModalOpen,
    handleClose,
    handleOpen,
  };

  return (
    <CustomModal modal={modalProps}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        style={{
          marginBottom: '0.75rem',
          maxWidth: '90%',
          margin: 'auto',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleCreatePost}
      >
        <Box style={{ position: 'relative', textAlign: 'center' }}>
          <Typography variant="h5">
            {isEdit ? 'Edit' : 'Write'} your Post!
          </Typography>
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', right: -15, top: -7 }}
          >
            <Close />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="caption">
            Note: Press "Shift" and "Enter" keys as an alternative to submit
            your post.
          </Typography>
          <TextField
            id="post-write"
            label="Write a post."
            placeholder="Write your post here."
            multiline
            variant="standard"
            value={postPayload.message}
            style={{ width: '100%' }}
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
            style={{ marginBottom: '1rem', marginTop: '1rem' }}
          >
            {!buttonLoading ? (
              isEdit ? (
                'Save'
              ) : (
                'Post'
              )
            ) : (
              <CircularProgress size={24} style={{ color: '#fff' }} />
            )}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
}
