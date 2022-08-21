/* --- STATE --- */

import { Comment } from 'db/models/Comment';
import { Post } from 'db/models/Post';

export interface PostState {
  posts: Post[];
  comments: Comment[];
  isEdit: boolean;
  postPayload: any;
  postModalOpen: boolean;
  postLoading: boolean;
}
