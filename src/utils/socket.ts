import { io } from 'socket.io-client';

export function socket() {
  const socket = io('https://fiona-socket.herokuapp.com/');
  return socket;
}

export enum SocketEvents {
  send_posts = 'send_posts',
  receive_posts = 'receive_posts',
  send_comments = 'send_comments',
  receive_comments = 'receive_comments',
}
