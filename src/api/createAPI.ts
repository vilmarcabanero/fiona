import { API } from '../config';

import WebServices from './WebServices';

export default function* createAPI(): any {
  const api = WebServices(API.SERVER.WEBSERVICES.OPTIONS);
  const token = yield localStorage.getItem('authToken');
  api.setHeader('Authorization', `Bearer ${token}`);
  return api;
}
