/**
 *
 * PostForm
 *
 */
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@mui/material';
import CustomModal from 'app/components/Modal';
import { ProfilePicture } from 'app/components/ProfilePicture';
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
      sx={{ maxWidth: 'md', border: '1px solid #e1e1e1', marginBottom: '1rem' }}
      variant="outlined"
    >
      <CardContent sx={{ marginBottom: '-10px', display: 'flex' }}>
        <ProfilePicture />
        <TextField
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
        sx={{
          '& .MuiTextField-root': { width: '30h' },
          width: '500px',
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
        <Box style={{ position: 'relative' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {isEdit ? 'Edit' : 'Write'} post
          </Typography>
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', right: -15, top: -7 }}
          >
            <Close />
          </IconButton>
        </Box>
        <Box>
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
              marginBottom: '5px',
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
