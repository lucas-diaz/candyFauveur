// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Header from 'src/components/Header';

const mapStateToProps = (state, ownProps) => ({
});


const mapDispatchToProps = (dispatch, ownProps) => ({
});

// Container
const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

// == Export
export default HeaderContainer;
