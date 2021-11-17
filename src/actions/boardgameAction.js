export const COLOR_ARRANGEMENT = 'COLOR_ARRANGEMENT';
export const MODIFY_COLOR_BLANK = 'MODIFY_COLOR_BLANK';
export const SQUARE_BEING_DRAGGED = 'SQUARE_BEING_DRAGGED';
export const SQUARE_BEING_REPLACED = 'SQUARE_BEING_REPLACED';
export const ADD_SCORE = 'ADD_SCORE'

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
