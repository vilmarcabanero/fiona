import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { selectUser } from '../Auth/slice/selectors';
import { useSelector } from 'react-redux';
import { LoginForm } from '../Auth/LoginForm';
import { RegisterForm } from '../Auth/RegisterForm';
import { PostForm } from '../PostPage/PostForm';
import { Auth } from '../Auth';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from 'utils/misc';
import MessageIcon from '@mui/icons-material/Message';

interface Props {}

export function Header(props: Props) {
  const { isLoggingIn, isLoggedIn } = useSelector(selectUser);
  const navigate = useNavigate();

  React.useEffect(() => {}, [isLoggedIn]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid #EBEBEB',
          boxShadow: '0 -1px 1.5px 0 rgba(0,0,0,0.5)',
          display: { xs: 'flex' },
          justifyContent: 'center',
          alignItems: 'space-between',
          height: '56px',
          paddingBottom: '1px',
        }}
      >
        <Toolbar
          sx={{
            display: { xs: 'flex' },
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              cursor: 'pointer',
              '&:hover': {
                opacity: '0.8',
              },
            }}
            variant="h6"
            component="div"
            color="primary"
            onClick={() => {
              navigate('/');
              scrollToTop();
            }}
          >
            Fiona
          </Typography>
          <Box
            sx={{
              display: { xs: 'flex' },
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* {isLoggedIn && <PostForm />} */}
            <IconButton
              sx={{ width: 41, height: 41, background: '#E1E1E1' }}
              onClick={() => {
                navigate('/messages');
              }}
            >
              <MessageIcon sx={{ color: 'black' }} />
            </IconButton>
            {isLoggedIn ? (
              <Auth />
            ) : isLoggingIn ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
