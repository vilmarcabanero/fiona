import apisauce from 'apisauce';

const createApi = (options = { baseURL: '/' }) => {
  const api = apisauce.create(options);

  return api;
};

export default createApi;
