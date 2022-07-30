import React from 'react';
import {} from '@mui/material';
import * as Styled from './styles';
import { Message } from './Message';

export const ChatMessages = () => {
  const messages = [
    {
      content: 'Message 1',
      _id: 1,
    },
    {
      content: 'Message 2',
      _id: 2,
    },
    {
      content: 'Message 3',
      _id: 3,
    },
    {
      content: 'Message 4',
      _id: 4,
    },
  ];
  return (
    <Styled.Container>
      {messages.map((message: any, index) => (
        <Message item={message._id} message={message}>
          {message}
        </Message>
      ))}
    </Styled.Container>
  );
};
