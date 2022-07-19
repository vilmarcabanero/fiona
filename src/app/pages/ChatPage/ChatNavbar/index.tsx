import React from 'react';
import { Paper } from '@mui/material';

export const ChatNavbar = () => {
  return (
    <Paper
      sx={{
        width: 'calc(100% - 360px)',
        height: '60px',
        position: 'fixed',
        top: '56px',
        left: '360px',
        borderBottom: '1px solid #EBEBEB',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)',
        borderRadius: 0,
      }}
    ></Paper>
  );
};
