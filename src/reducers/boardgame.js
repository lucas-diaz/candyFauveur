import {SET_SCORE_TRUE_OR_FALSE, SET_MOVEMENT, COLOR_ARRANGEMENT, MODIFY_COLOR_BLANK, SQUARE_BEING_REPLACED, SQUARE_BEING_DRAGGED, ADD_SCORE } from '../actions/boardgameAction';

import pacman from '../assets/pacman.png';
import joevin from '../assets/joevin.png';
import lucas from '../assets/lucas.png';
import maeva from '../assets/maeva.png';
import shuny from '../assets/shuny.png';
import prout from '../assets/prout.jpg';

const initialState = {
  width: 8,
  candyColors: [
    pacman,
    joevin,
    lucas,
    maeva,
    shuny,
    prout,
  ],
  colorArrangement: [],
  squareBeingDragged: {},
  squareBeingReplaced: {},
  score: 0,
  scoreTrueOrFalse: false,
  movement: 15,

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
    case SET_SCORE_TRUE_OR_FALSE:
      return{
        ...state,
        scoreTrueOrFalse: true,
      };
    case SET_MOVEMENT:
      return{
        ...state,
        movement: state.movement - 1,
      };
    default:
      return state;
  }
};

export default boardgame;
