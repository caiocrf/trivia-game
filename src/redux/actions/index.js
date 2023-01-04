export const GET_LOGIN_USER = 'GET_LOGIN';
export const GET_TOKEN_USER = 'GET_TOKEN';
export const GET_SCORE = 'ADD_SCORE';
export const GET_ASSERTIONS_USER = 'ADD_ASSERTIONS';
export const CLEAR_STATE = 'CLEAR_STATE';

export const getLoginUser = (payload) => ({
  type: GET_LOGIN_USER,
  payload,
});

export const getTokenUser = (payload) => ({
  type: GET_TOKEN_USER,
  payload,
});

export const getAssertionsUser = (payload) => ({
  type: GET_ASSERTIONS_USER,
  payload,
});

export const clearState = (payload) => ({
  type: CLEAR_STATE,
  payload,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});
