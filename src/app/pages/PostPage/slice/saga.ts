import createAPI from 'api/createAPI';
import { selectUser } from 'app/pages/Auth/slice/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { postActions as actions } from '.';
import { selectPost } from './selectors';

function* getPosts() {
  const api = yield createAPI();

  yield put(actions.setBackdropLoading(true));
  const response = yield call(api.call, 'getAllPosts');
  const posts = response.data.filter((post: any) => !post.hidden);

  if (response.ok) {
    yield put(actions.setPosts(posts));
  }
  yield put(actions.setBackdropLoading(false));
}

function* getPostsUpdate() {
  const api = yield createAPI();

  const response = yield call(api.call, 'getAllPosts');
  const posts = response.data.filter((post: any) => !post.hidden);
  if (response.ok) {
    yield put(actions.setPosts(posts));
  }
}

function* getComments() {
  const api = yield createAPI();

  const response = yield call(api.call, 'getAllComments');

  if (response.ok) {
    yield put(actions.setComments(response.data));
  }
}

function* getCommentsUpdate() {
  const api = yield createAPI();

  const response = yield call(api.call, 'getAllComments');

  if (response.ok) {
    yield put(actions.setComments(response.data));
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

  yield put(actions.setComments([...postState.comments, newComment]));
  const response = yield call(api.call, 'createComment', action.payload);

  const updatedComments = postState.posts.filter(
    (comment: any) => comment._id !== id,
  );
  if (response.ok) {
    yield put(actions.setComments([...postState.comments, response.data]));
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

  yield put(actions.setPosts([...postState.posts, newPost]));
  // yield put(actions.setPosts((prevPosts: any) => [...prevPosts, newPost]));

  const response = yield call(api.call, 'createPost', {
    message: postState.postPayload.message,
  });

  const updatedPosts = postState.posts.filter((post: any) => post._id !== id);
  if (response.ok) {
    yield put(actions.setPosts([...updatedPosts, response.data]));
  } else {
    yield put(actions.setPosts(updatedPosts));
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

  if (!response.ok) {
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

  if (!response.ok) {
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
    const newPosts = postState.posts.filter(
      (post: any) => post._id !== response.data._id,
    );
    yield put(actions.setPosts(newPosts));
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

  if (!response.ok) {
    yield put(actions.setPosts(oldPosts));
  }
}

export function* postSaga() {
  yield takeLatest(actions.getPosts.type, getPosts);
  yield takeLatest(actions.getPostsUpdate.type, getPostsUpdate);
  yield takeLatest(actions.getComments.type, getComments);
  yield takeLatest(actions.getCommentsUpdate.type, getCommentsUpdate);
  yield takeLatest(actions.createComment.type, createComment);
  yield takeLatest(actions.createPost.type, createPost);
  yield takeLatest(actions.likePost.type, likePost);
  yield takeLatest(actions.updatePost.type, updatePost);
  yield takeLatest(actions.deletePost.type, deletePost);
  yield takeLatest(actions.hidePost.type, hidePost);
}
