import { GET_TOKEN_USER } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN_USER:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default tokenReducer;
