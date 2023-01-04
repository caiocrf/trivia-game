import { GET_LOGIN_USER, GET_SCORE, GET_ASSERTIONS_USER, CLEAR_STATE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case GET_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case GET_ASSERTIONS_USER:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  case CLEAR_STATE:
    return {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default player;
