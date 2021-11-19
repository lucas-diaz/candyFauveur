import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './styles.css';
import logoFauve from '../../assets/logoFauve.png'
// == Composant
const Header = ({}) => (
  <header className="header">
  <img className="logo-left" src={logoFauve} alt="logo fauve"></img>
  <h1 className='title'>je suis un titre</h1>
  <img src={logoFauve} className="logo-right" alt="logo fauve"></img>
  </header>
  
);

Header.propTypes = {
};

Header.defaultProps = {
};
// == Export
export default Header;
