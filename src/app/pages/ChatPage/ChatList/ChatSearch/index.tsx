import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import React from 'react';
import * as Styled from './styles';

export const ChatSearch = () => {
  return (
    <Styled.ChatSearchInput
      placeholder="Search chat"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    ></Styled.ChatSearchInput>
  );
};
