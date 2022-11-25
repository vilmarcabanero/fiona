import { Box } from '@mui/system';
import styled from 'styled-components';

export const Container = styled(Box)`
  .right {
    color: #fff;
    background-color: #0084ff;
  }

  .left {
    color: #050505;
    background-color: #e4e6eb;
    align-self: flex-start;
  }
`;

export const Wrapper = styled(Box)`
  padding: 6px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 14px;
`;
