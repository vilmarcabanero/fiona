/* --- STATE --- */

export interface PostState {
  posts: any;
  comments: any;
  isEdit: boolean;
  postPayload: any;
  postModalOpen: boolean;
  postLoading: boolean;
  popoverOpen: boolean;
}
