import React from 'react';
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, IconButton, TextField } from '@mui/material';

export const MessageForm = () => {
  const handleSendMessage = (
    values: FormikValues,
    formikHelpers: FormikHelpers<any>,
  ) => {
    //dispact(actions.sendMessage(values));
    formikHelpers.resetForm();
  };
  return (
    <Box
      sx={{
        width: 'calc(100% - 360px)',
        height: '60px',
        position: 'fixed',
        bottom: 0,
        right: 0,
        borderRadius: 0,
        paddingRight: '3px',
        paddingLeft: '8px',
      }}
    >
      <Formik initialValues={{ message: '' }} onSubmit={handleSendMessage}>
        {() => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '10px',
              }}
            >
              <Field
                name="message"
                as={TextField}
                placeholder="Aa"
                fullWidth
                size="small"
                autoComplete="off"
              />
              <IconButton>
                <ThumbUpIcon sx={{ color: '#2078F4' }} />
              </IconButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
