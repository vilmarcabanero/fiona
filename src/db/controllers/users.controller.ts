import { Keys } from 'db/keys';
import { User } from 'db/models/User';
import localforage from 'localforage';

export async function _getAllUsers(): Promise<User[] | null> {
  return localforage.getItem(Keys.users);
}

export async function _getUser(userId: string) {
  return localforage.getItem(Keys.users + userId);
}

export async function _setAllUsers(data: User[]) {
  await localforage.setItem(Keys.users, data);
}

export async function _setUser(userId: string, data: User) {
  await localforage.setItem(Keys.users + userId, data);
}
