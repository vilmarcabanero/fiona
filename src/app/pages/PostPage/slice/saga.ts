import createAPI from 'api/createAPI';
import { selectUser } from 'app/pages/Auth/slice/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { postActions as actions } from '.';
import { socket, SocketEvents } from 'utils/socket';
import { selectPost } from './selectors';
import * as db from 'db/controllers/posts.controller';
import { Comment } from 'db/models/Comment';
import { Post } from 'db/models/Post';
import { ApiResponse } from 'apisauce';
import {
  _getAllComments,
  _setComments,
} from 'db/controllers/comments.controller';

function* getPosts() {
  const cachedPosts: Post[] | null = yield db._getAllPosts();

  if (cachedPosts) {
    const posts = cachedPosts.filter((post: any) => !post.hidden);
    yield put(actions.setPosts(posts));
  } else {
    const api = yield createAPI();

    yield put(actions.setPostLoading(true));
    const response: ApiResponse<Post[]> = yield call(api.call, 'getAllPosts');
    yield put(actions.setPostLoading(false));
    const posts: Post[] | undefined = response.data?.filter(
      post => !post.hidden,
    );

    if (response.ok) {
      yield put(actions.setPosts(posts));
      if (posts) yield db._setPosts(posts);
    }
  }
}

function* getComments() {
  const cachedComments: Post[] | null = yield _getAllComments();

  if (cachedComments) {
    yield put(actions.setComments(cachedComments));
  } else {
    const api = yield createAPI();

    const response = yield call(api.call, 'getAllComments');

    if (response.ok) {
      yield put(actions.setComments(response.data));
      if (response.data) yield _setComments(response.data);
    }
  }
}

function* createComment(action: any) {
  const api = yield createAPI();

  const postState = yield select(selectPost);
  const userState = yield select(selectUser);

  const dateNow = new Date();
  const id = String(Math.random());

  const userName = `${userState.userDetails.firstName} ${userState.userDetails.lastName}`;

  const newComment = {
    _id: id,
    userId: userState.userDetails._id,
    postId: action.payload.postId,
    userName,
    likers: [],
    createdAt: dateNow.toISOString(),
    message: action.payload.message,
  };

  const newComments = [...postState.comments, newComment];
  yield put(actions.setComments(newComments));

  const { data, ok }: ApiResponse<Comment[]> = yield call(
    api.call,
    'createComment',
    action.payload,
  );

  const updatedComments = postState.posts.filter(
    (comment: any) => comment._id !== id,
  );
  if (ok) {
    const updatedComments = [...postState.comments, data];
    yield put(actions.setComments(updatedComments));
    socket().emit(SocketEvents.send_comments, updatedComments);
  } else {
    yield put(actions.setComments(updatedComments));
  }
}

function* createPost(action: any) {
  const api = yield createAPI();

  const postState = yield select(selectPost);
  const userState = yield select(selectUser);

  const dateNow = new Date();
  const id = String(Math.random());

  const userName = `${userState.userDetails.firstName} ${userState.userDetails.lastName}`;

  const newPost = {
    _id: id,
    userId: userState.userDetails._id,
    userName,
    likers: [],
    createdAt: dateNow.toISOString(),
    message: postState.postPayload.message,
  };

  const newPosts = [...postState.posts, newPost];
  yield put(actions.setPosts(newPosts));

  const response = yield call(api.call, 'createPost', {
    message: postState.postPayload.message,
  });

  const updatedPosts = postState.posts.filter((post: any) => post._id !== id);
  if (response.ok) {
    const newPosts = [...updatedPosts, response.data]; // This is necessary to put to the state the real data like real _id.
    yield put(actions.setPosts(newPosts));
    socket().emit(SocketEvents.send_posts, newPosts);
  } else {
    // yield put(actions.setPosts(updatedPosts));
  }

  yield put(actions.setPostPayload({}));
  yield put(actions.setIsEdit(false));
}

function* likePost(action: any) {
  const api = yield createAPI();

  const postState = yield select(selectPost);
  const userState = yield select(selectUser);

  const oldPosts = postState.posts;

  const posts = postState.posts.map((post: any) => ({ ...post }));

  const found = posts.find((post: any) => post._id === action.payload);

  const foundLiker = found.likers.find(
    (liker: any) => liker.toString() === userState.userDetails._id.toString(),
  );

  const likers = [...found.likers];

  if (!foundLiker) {
    likers.push(userState.userDetails._id);
  } else {
    const indexOfLiker = likers
      .map((liker: any) => liker.toString())
      .indexOf(userState.userDetails._id.toString());
    likers.splice(indexOfLiker, 1);
  }

  const updatedPosts = posts.map((post: any) => {
    if (post._id === action.payload) {
      post.likers = likers;
    }

    return post;
  });

  yield put(actions.setPosts(updatedPosts));

  const response = yield call(api.call, 'likePost', { id: action.payload });
  if (response.ok) {
    socket().emit(SocketEvents.send_posts, updatedPosts);
  } else {
    yield put(actions.setPosts(oldPosts));
  }
}

function* updatePost(action: any) {
  const api = yield createAPI();

  const postState = yield select(selectPost);

  const oldPosts = postState.posts;

  const updatedPosts = postState.posts
    .map((post: any) => ({ ...post }))
    .map((post: any) => {
      if (post._id === postState.postPayload.id) {
        post.message = postState.postPayload.message;
      }
      return post;
    });

  yield put(actions.setPosts(updatedPosts));

  const response = yield call(api.call, 'updatePost', {
    id: postState.postPayload.id,
    data: {
      message: postState.postPayload.message,
    },
  });

  if (response.ok) {
    socket().emit(SocketEvents.send_posts, updatedPosts);
  } else {
    yield put(actions.setPosts(oldPosts));
  }
}

function* deletePost(action: any) {
  const api = yield createAPI();

  const postState = yield select(selectPost);

  const newPosts = postState.posts.filter(
    (post: any) => post._id !== action.payload,
  );

  yield put(actions.setPosts(newPosts));

  const response = yield call(api.call, 'deletePost', action.payload);

  if (response.ok) {
    socket().emit(SocketEvents.send_posts, newPosts);
  } else {
    yield put(actions.setPosts([...postState.posts, response.data]));
  }
}
function* hidePost(action: any) {
  const api = yield createAPI();

  const postState = yield select(selectPost);

  const oldPosts = postState.posts;

  const updatedPosts = postState.posts.filter(
    (post: any) => post._id !== action.payload,
  );

  yield put(actions.setPosts(updatedPosts));

  const response = yield call(api.call, 'hidePost', {
    id: action.payload,
  });

  if (response.ok) {
    socket().emit(SocketEvents.send_posts, updatedPosts);
  } else {
    yield put(actions.setPosts(oldPosts));
  }
}

export function* postSaga() {
  yield takeLatest(actions.getPosts.type, getPosts);
  yield takeLatest(actions.getComments.type, getComments);
  yield takeLatest(actions.createComment.type, createComment);
  yield takeLatest(actions.createPost.type, createPost);
  yield takeLatest(actions.likePost.type, likePost);
  yield takeLatest(actions.updatePost.type, updatePost);
  yield takeLatest(actions.deletePost.type, deletePost);
  yield takeLatest(actions.hidePost.type, hidePost);
}
