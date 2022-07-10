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
import { Field, Form, Formik } from 'formik';
import { object, ref, string } from 'yup';
import CustomModal from 'app/components/Modal';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUserSlice } from '../slice';
import { selectUser } from '../slice/selectors';
import { style } from './styles';
import { initialRegisterPayload } from '../slice/utils';
import {
  CONFIRM_PASSWORD_REQUIRED,
  EMAIL_REQUIRED,
  FIRST_NAME_REQUIRED,
  LAST_NAME_REQUIRED,
  PASSWORDS_DONOT_MATCH,
  PASSWORD_REQUIRED,
  PASSWORD_TOO_SHORT,
  VALID_EMAIL_REQUIRED,
} from '../validation';

interface Props {}

export function RegisterForm(props: Props) {
  // const [postValue, setPostValue] = React.useState('');
  const { actions } = useUserSlice();
  const dispatch = useDispatch();
  const { registerModalOpen, isEmailValid, emailError, isAuthLoading } =
    useSelector(selectUser);

  const handleOpen = () => {
    dispatch(actions.setRegisterModalOpen(true));
    dispatch(actions.setIsLoggingIn(true));
    dispatch(actions.setLoginModalOpen(false));
    dispatch(actions.setIsEmailValid(true));
  };
  const handleClose = () => {
    dispatch(actions.setRegisterModalOpen(false));
    dispatch(actions.setIsLoggingIn(true));
    dispatch(actions.setLoginModalOpen(false));
    dispatch(actions.setIsEmailValid(true));
  };

  const modalProps = {
    button: 'Login',
    style,
    open: registerModalOpen,
    handleClose,
    handleOpen,
  };

  const handleRegister = (values: any) => {
    dispatch(actions.register(values));
  };

  return (
    <CustomModal modal={modalProps}>
      <Box
        style={{
          marginBottom: '0.75rem',
          maxWidth: '90%',
          margin: 'auto',
        }}
        onSubmit={(e: any) => handleRegister(e)}
      >
        <Box style={{ position: 'relative', textAlign: 'center' }}>
          <Typography variant="h5">Register</Typography>
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', right: -15, top: -7 }}
          >
            <Close />
          </IconButton>
        </Box>
        <Formik
          initialValues={initialRegisterPayload}
          onSubmit={handleRegister}
          validationSchema={object({
            firstName: string().required(FIRST_NAME_REQUIRED),
            lastName: string().required(LAST_NAME_REQUIRED),
            email: string()
              .required(EMAIL_REQUIRED)
              .email(VALID_EMAIL_REQUIRED),
            password: string()
              .required(PASSWORD_REQUIRED)
              .min(8, PASSWORD_TOO_SHORT),
            confirmPassword: string()
              .required(CONFIRM_PASSWORD_REQUIRED)
              .oneOf([ref('password'), null], PASSWORDS_DONOT_MATCH),
          })}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form style={{ width: '100%' }}>
              <Field
                as={TextField}
                name="firstName"
                label="First name"
                placeholder="Enter your first name"
                variant="standard"
                fullWidth
                error={Boolean(errors.firstName) && Boolean(touched.firstName)}
                helperText={Boolean(touched.firstName) && errors.firstName}
              />
              <Box height="1rem" />
              <Field
                as={TextField}
                name="lastName"
                label="Last name"
                placeholder="Enter your last name"
                variant="standard"
                fullWidth
                error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                helperText={Boolean(touched.lastName) && errors.lastName}
              />
              <Box height="1rem" />
              <Field
                as={TextField}
                name="email"
                label="Email"
                placeholder="Enter your email"
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
                as={TextField}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                variant="standard"
                fullWidth
                error={Boolean(errors.password) && Boolean(touched.password)}
                helperText={Boolean(touched.password) && errors.password}
              />
              <Box height="1rem" />
              <Field
                as={TextField}
                name="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="Enter your confirm password"
                variant="standard"
                fullWidth
                error={
                  Boolean(errors.confirmPassword) &&
                  Boolean(touched.confirmPassword)
                }
                helperText={
                  Boolean(touched.confirmPassword) && errors.confirmPassword
                }
              />
              <Box height="1rem" />
              <Box
                style={{
                  position: 'relative',
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
                    'Register'
                  )}
                </Button>

                <Button
                  onClick={() => {
                    dispatch(actions.setIsLoggingIn(true));
                    dispatch(actions.setLoginModalOpen(true));
                  }}
                  style={{
                    textTransform: 'none',
                    position: 'absolute',
                    right: 0,
                    top: '3rem',
                  }}
                >
                  Already registered?
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </CustomModal>
  );
}
