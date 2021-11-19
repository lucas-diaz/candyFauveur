// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import BoardGame from '../components/Boardgame';

// Action Creators
import { colorArrangement, setMovement, modifyColorBlank, squareBeingDragged, squareBeingReplaced, addScore, setScoreTrueOrFalse } from '../actions/boardgameAction';

const mapStateToProps = (state, ownProps) => ({
  width: state.boardgame.width,
  candyColors: state.boardgame.candyColors,
  colorArrangement: state.boardgame.colorArrangement,
  squareDragged: state.boardgame.squareBeingDragged,
  squareReplaced: state.boardgame.squareBeingReplaced,
  score: state.boardgame.score,
  scoreTrueOrFalse: state.boardgame.scoreTrueOrFalse,
  movement: state.boardgame.movement,
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
  addScore:(payload) => { console.log('container score', payload)
    dispatch(addScore(payload))
  },
  setScoreTrueOrFalse: (payload) => {
    dispatch(setScoreTrueOrFalse())
  },
  setMovement: () => {
    dispatch(setMovement())
  },
});

// Container
const BoardGameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardGame);
// == Export
export default BoardGameContainer;
