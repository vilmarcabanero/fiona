import { Box } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  width: calc(100% - 360px);
  height: calc(100vh - 176px);
  position: fixed;
  bottom: 60px;
  left: 360px;
  border-radius: 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  padding: 15px;
  overflow-y: scroll;
`;
