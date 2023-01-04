import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import player from './player';

const rootReducer = combineReducers({
  userReducer,
  player,
  tokenReducer,
});

export default rootReducer;
