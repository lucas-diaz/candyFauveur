// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import BoardGame from '../components/Boardgame';

// Action Creators
import { colorArrangement, modifyColorBlank, squareBeingDragged, squareBeingReplaced, addScore } from '../actions/boardgameAction';

const mapStateToProps = (state, ownProps) => ({
  width: state.boardgame.width,
  candyColors: state.boardgame.candyColors,
  colorArrangement: state.boardgame.colorArrangement,
  squareDragged: state.boardgame.squareBeingDragged,
  squareReplaced: state.boardgame.squareBeingReplaced,
  score: state.boardgame.score,
  });


const mapDispatchToProps = (dispatch, ownProps) => ({
  randColors: (payload) => {
    dispatch(colorArrangement(payload))
  },
  modifyColorBlank: (payload) => {
    dispatch(modifyColorBlank(payload))
  },
  squareBeingDragged: (payload) => {
    dispatch(squareBeingDragged(payload))
  },
  squareBeingReplaced: (payload) => {
    dispatch(squareBeingReplaced(payload))
  },
  addScore:(payload) => {
    dispatch(addScore(payload))
  }
});

// Container
const BoardGameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardGame);
// == Export
export default BoardGameContainer;
