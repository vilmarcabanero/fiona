import React from 'react';
import { Paper } from '@mui/material';

export const ChatMessages = () => {
  return (
    <Paper
      sx={{
        width: 'calc(100% - 360px)',
        height: 'calc(100vh - 56px)',
        position: 'fixed',
        top: '116px',
        left: '360px',
        borderRadius: 0,
      }}
    ></Paper>
  );
};
