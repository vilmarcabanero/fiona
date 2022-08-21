export interface Post {
  _id?: string;
  userId: string;
  message: string;
  userName: string;
  likers: string[];
  hidden: boolean;
  username: string;
  createdAt: string;
  updatedAt: string;
}
