import { Keys } from 'db/keys';
import { Post } from 'db/models/Post';
import localforage from 'localforage';

export async function _getAllPosts(): Promise<Post[] | null> {
  return localforage.getItem(Keys.posts);
}

export async function _getPosts(userId: string) {
  return localforage.getItem(Keys.posts + userId);
}

export async function _setPosts(data: Post[]) {
  await localforage.setItem(Keys.posts, data);
}
