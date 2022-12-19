export const GET_TOKEN_API = 'GET_TOKEN_API';
export const GET_LOGIN_USER = 'GET_LOGIN_USER';

export const getTokenApi = (payload) => ({
  type: GET_TOKEN_API,
  payload,
});

export const getLoginUser = (payload) => ({
  type: GET_LOGIN_USER,
  payload,
});
