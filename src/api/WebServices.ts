import createApi from '../createApi';
import { API } from '../config';

const WebServices = (options = API.SERVER.WEBSERVICES.OPTIONS) => {
  const api: any = createApi(options);

  const mapping: any = {
    login: {
      path: '/auth/login',
      method: 'post',
    },
    register: {
      path: '/auth/register',
      method: 'post',
    },
    forgotPassword: {
      path: '/auth/forgotpassword',
      method: 'post',
    },
    logout: {
      path: '/login/logout',
      method: 'post',
      cache: null,
    },
    getUser: {
      path: '/auth/user',
      method: 'getNoParam',
    },
    getAllUsers: {
      path: '/auth/user/all',
      method: 'getNoParam',
    },
    getAllPosts: {
      path: '/posts',
      method: 'getNoParam',
    },
    getAllComments: {
      path: '/comments',
      method: 'getNoParam',
    },
    createComment: {
      path: '/comments',
      method: 'post',
    },
    createPost: {
      path: '/posts',
      method: 'post',
    },
    likePost: {
      path: '/posts/like',
      method: 'patch',
    },
    updatePost: {
      path: '/posts',
      method: 'patch',
    },
    deletePost: {
      path: '/posts',
      method: 'delete',
    },
    hidePost: {
      path: '/posts/hide',
      method: 'patch',
    },
  };
  const call = (type: any, params: any = {}, customPath = null) => {
    const { method, path, headers } = mapping[type];
    switch (method) {
      case 'update':
        return api.update(`${path}/${params.id}`, params.data);
      case 'patch':
        return api.patch(`${path}/${params.id}`, params.data);
      case 'delete':
        return api.delete(`${path}/${params}`);
      case 'get':
        return api.get(`${path}/${params}`);
      case 'getNoParam':
        return api.get(path);
      case 'post':
        return api.post(
          customPath === null ? path : customPath,
          params,
          headers,
        );
      case 'getSearch':
        return api.get(customPath, params, headers);
      case 'put':
        return api.put(`${path}/${params.id}`, params.data);
      default:
        break;
    }
    return false;
  };

  const setHeader = (key: any, value: any) => {
    api.setHeader(key, value);
  };

  return {
    call,
    setHeader,
  };
};

export default WebServices;
