import { User } from 'db/models/User';
import { io } from 'socket.io-client';

export function socket() {
  const socket = io(
    process.env.SOCKET_URL || 'https://fiona-socket.herokuapp.com',
  );
  return socket;
}

export enum SocketEvents {
  send_posts = 'send_posts',
  receive_posts = 'receive_posts',
  send_comments = 'send_comments',
  receive_comments = 'receive_comments',
  send_all_users = 'send_all_users',
  receive_all_users = 'receive_all_users',
  send_user = 'send_user',
  receive_user = 'receive_user',
}

export interface ISocketUser {
  userId: string;
  user: User;
}
