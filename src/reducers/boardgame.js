import { COLOR_ARRANGEMENT, MODIFY_COLOR_BLANK, SQUARE_BEING_REPLACED, SQUARE_BEING_DRAGGED, ADD_SCORE } from '../actions/boardgameAction';

import pacman from '../assets/pacman.png';
import joevin from '../assets/joevin.png';
import lucas from '../assets/lucas.png';
import maeva from '../assets/maeva.png';
import shuny from '../assets/shuny.png';

const initialState = {
  width: 8,
  candyColors: [
    'blue',
    'orange',
    'purple',
    'red',
    'yellow',
    'green'
    
  ],
  colorArrangement: [],
  squareBeingDragged: {},
  squareBeingReplaced: {},
  score: 0,

};

const boardgame = (state = initialState, action = {}) => {
  switch (action.type) {
    case COLOR_ARRANGEMENT:
      return {
        ...state,
        colorArrangement: [...action.payload],
      };
    case MODIFY_COLOR_BLANK:
      return {
        ...state,
        colorArrangement: [...action.payload],
      };
    case SQUARE_BEING_DRAGGED:
      return{
        ...state,
        squareBeingDragged: action.payload,
      };
    case SQUARE_BEING_REPLACED:
      return{
        ...state,
        squareBeingReplaced: action.payload,
      };
    case ADD_SCORE:
      return{
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};

export default boardgame;
