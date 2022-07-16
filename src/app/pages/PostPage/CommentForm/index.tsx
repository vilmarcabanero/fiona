import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { usePostSlice } from '../slice';
import { selectUser } from 'app/pages/Auth/slice/selectors';

export default function CommentForm(props: any) {
  const [commentValue, setCommentValue] = React.useState('');

  const dispatch = useDispatch();
  const { actions } = usePostSlice();
  const { isLoggedIn } = useSelector(selectUser);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(event.target.value);
  };

  const handleCreateComment = (e: any) => {
    e.preventDefault();
    dispatch(
      actions.createComment({
        message: commentValue,
        postId: props.postId,
      }),
    );

    setCommentValue('');
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      style={{
        maxWidth: '90%',
        margin: 'auto',
        marginBottom: '1.25rem',
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="comment-write"
          placeholder="Write your comment here."
          multiline
          variant="standard"
          value={commentValue}
          style={{ width: '100%', marginTop: 20 }}
          onChange={handleChange}
          disabled={!isLoggedIn}
          onKeyDown={e => {
            if (e.keyCode === 13 && !e.shiftKey) {
              handleCreateComment(e);
            }
          }}
        />
      </div>
    </Box>
  );
}
