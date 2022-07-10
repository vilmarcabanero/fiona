import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import { selectUser } from '../Auth/slice/selectors';
import { useSelector } from 'react-redux';
import { LoginForm } from '../Auth/LoginForm';
import { RegisterForm } from '../Auth/RegisterForm';
import { PostForm } from '../PostPage/PostForm';
import { Auth } from '../Auth';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export function Header(props: Props) {
  const { isLoggingIn, isLoggedIn } = useSelector(selectUser);

  React.useEffect(() => {}, [isLoggedIn]);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          style={{
            backgroundColor: 'transparent',
            boxShadow: ' 0 0px 1.5px 0 rgba(0,0,0,0.5)',
          }}
        >
          <Toolbar
            sx={{
              display: { xs: 'flex' },
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" component="div" color="primary">
              Post it!
            </Typography>

            <Box
              sx={{
                display: { xs: 'flex' },
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {isLoggedIn && <PostForm />}
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
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
