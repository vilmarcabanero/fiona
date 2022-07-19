import React from 'react';
import { Paper } from '@mui/material';

export const ChatList = () => {
  return (
    <Paper
      sx={{
        width: '360px',
        height: 'calc(100vh - 56px)',
        borderLeft: '1px solid #e1e1e1',
        position: 'fixed',
        top: '56px',
        left: 0,
      }}
    ></Paper>
  );
};
