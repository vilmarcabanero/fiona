import React from 'react';
import { ChatListHeader } from './ChatListHeader';
import { ChatSearch } from './ChatSearch';
import * as Styled from './styles';

export const ChatList = () => {
  return (
    <Styled.Container>
      <ChatListHeader /> <ChatSearch />
    </Styled.Container>
  );
};
