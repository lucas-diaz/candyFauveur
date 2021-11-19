export const COLOR_ARRANGEMENT = 'COLOR_ARRANGEMENT';
export const MODIFY_COLOR_BLANK = 'MODIFY_COLOR_BLANK';
export const SQUARE_BEING_DRAGGED = 'SQUARE_BEING_DRAGGED';
export const SQUARE_BEING_REPLACED = 'SQUARE_BEING_REPLACED';
export const ADD_SCORE = 'ADD_SCORE';
export const SET_SCORE_TRUE_OR_FALSE = 'SET_SCORE_TRUE_OR_FALSE';
export const SET_MOVEMENT = 'SET_MOVEMENT';

export const colorArrangement = (payload) => ({
  type: COLOR_ARRANGEMENT,
  payload,
});

export const modifyColorBlank = (payload) => ({
  type: MODIFY_COLOR_BLANK,
  payload,
});

export const squareBeingDragged = (payload) => ({
  type: SQUARE_BEING_DRAGGED,
  payload,
});

export const squareBeingReplaced = (payload) => ({
  type: SQUARE_BEING_REPLACED,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const setScoreTrueOrFalse = () => ({
  type: SET_SCORE_TRUE_OR_FALSE,
});

export const setMovement = () => ({
  type: SET_MOVEMENT,
});
