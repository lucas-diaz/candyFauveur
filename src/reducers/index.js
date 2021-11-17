import { combineReducers } from 'redux';
import counter from './counter';
import boardgame from './boardgame';

export default combineReducers({
  counter,
  boardgame,
});
