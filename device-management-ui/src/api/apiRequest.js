import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_API;
const API_BASE_URL = `${backend}/api/`;
const API_TIMEOUT = 60000;

const request = (method = 'GET', path, data, token) => {
  let requestData = {};
  if (data) {
    if (method.toLowerCase() === 'get') {
      requestData.params = data;
    } else {
      requestData.data = data;
    }
  }

  // Get auth token
  const headers = { Authorization: `Bearer ${token}` };

  return axios({
    baseURL: API_BASE_URL,
    url: path,
    method,
    headers,
    timeout: API_TIMEOUT,
    ...requestData,
  });
};

const requestWithMethod = (method) => (...args) =>
  request.apply(null, [method, ...args]);

const apiRequest = {
  get: requestWithMethod('GET'),
  post: requestWithMethod('POST'),
  put: requestWithMethod('PUT'),
  delete: requestWithMethod('DELETE'),
};

export { apiRequest };
