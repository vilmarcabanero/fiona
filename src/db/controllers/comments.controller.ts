import { Keys } from 'db/keys';
import { Comment } from 'db/models/Comment';
import localforage from 'localforage';

export async function _getAllComments(): Promise<Comment[] | null> {
  return localforage.getItem(Keys.comments);
}

export async function _setComments(data: Comment[]) {
  await localforage.setItem(Keys.comments, data);
}
