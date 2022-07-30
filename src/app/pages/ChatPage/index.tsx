/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Header } from 'app/components/Header';
import { useDispatch } from 'react-redux';
import { useUserSlice } from '../Auth/slice';
import { ChatList } from './ChatList';
import { ChatMessages } from './ChatMessages';
import { ChatNavbar } from './ChatNavbar';
import { MessageForm } from './MessageForm';

export function ChatPage() {
  const { actions: userActions } = useUserSlice();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.getUser());
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ChatList />
      <ChatNavbar />
      <ChatMessages />
      <MessageForm />
    </React.Fragment>
  );
}
