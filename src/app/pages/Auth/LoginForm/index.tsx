/**
 *
 * PostForm
 *
 */
import * as React from 'react';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import CustomModal from 'app/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useUserSlice } from '../slice';
import { selectUser } from '../slice/selectors';
import { style } from './styles';
import { initialLoginPayload } from '../slice/utils';
import {
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_TOO_SHORT,
  VALID_EMAIL_REQUIRED,
} from '../validation';

interface Props {}

export function LoginForm(props: Props) {
  // const [postValue, setPostValue] = React.useState('');
  const { actions } = useUserSlice();
  const dispatch = useDispatch();
  const {
    loginModalOpen,
    isEmailValid,
    emailError,
    isPasswordValid,
    passwordError,
  } = useSelector(selectUser);

  const handleOpen = () => {
    dispatch(actions.setLoginModalOpen(true));
    dispatch(actions.setIsEmailValid(true));
    dispatch(actions.setIsPasswordValid(true));
  };
  const handleClose = () => {
    dispatch(actions.setLoginModalOpen(false));
    dispatch(actions.setIsEmailValid(true));
    dispatch(actions.setIsPasswordValid(true));
  };

  const modalProps = {
    button: <Button onClick={handleOpen}>Login</Button>,
    style,
    open: loginModalOpen,
    handleClose,
    handleOpen,
  };

  const { isAuthLoading } = useSelector(selectUser);

  const handleLogin = (values: any) => {
    dispatch(actions.login(values));
  };

  return (
    <CustomModal modal={modalProps}>
      <Box
        style={{
          marginBottom: '0.75rem',
          maxWidth: '90%',
          margin: 'auto',
        }}
      >
        <Box style={{ position: 'relative', textAlign: 'center' }}>
          <Typography variant="h5">Login</Typography>
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', right: -15, top: -7 }}
          >
            <Close />
          </IconButton>
        </Box>
        <Formik
          initialValues={initialLoginPayload}
          onSubmit={handleLogin}
          validationSchema={object({
            email: string()
              .required(EMAIL_REQUIRED)
              .email(VALID_EMAIL_REQUIRED),
            password: string()
              .required(PASSWORD_REQUIRED)
              .min(8, PASSWORD_TOO_SHORT),
          })}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form style={{ width: '100%' }}>
              <Field
                name="email"
                as={TextField}
                placeholder="Enter your email"
                label="Email"
                variant="standard"
                fullWidth
                error={
                  (Boolean(errors.email) && Boolean(touched.email)) ||
                  !isEmailValid
                }
                helperText={
                  (Boolean(touched.email) && errors.email) ||
                  (!isEmailValid && emailError)
                }
              />
              <Box height="1rem" />
              <Field
                name="password"
                as={TextField}
                type="password"
                placeholder="Enter your password"
                label="Password"
                variant="standard"
                fullWidth
                error={
                  (Boolean(errors.password) && Boolean(touched.password)) ||
                  !isPasswordValid
                }
                helperText={
                  (Boolean(touched.password) && errors.password) ||
                  (!isPasswordValid && passwordError)
                }
              />
              <Box height="1rem" />
              <Box
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '5.3rem',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!dirty || !isValid}
                >
                  {isAuthLoading ? (
                    <CircularProgress size={24} style={{ color: '#fff' }} />
                  ) : (
                    'Login'
                  )}
                </Button>
                <Box height="1rem" />
                <Button
                  onClick={() => {
                    dispatch(actions.setIsLoggingIn(false));
                    dispatch(actions.setRegisterModalOpen(true));
                  }}
                  style={{
                    textTransform: 'none',
                    position: 'absolute',
                    right: 0,
                    top: '3rem',
                  }}
                >
                  Not yet registered?
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </CustomModal>
  );
}
