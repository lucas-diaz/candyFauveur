// == Import npm
import React from 'react';

// == Import
// import Counter from 'src/containers/Counter';
import BoardGame from 'src/containers/BoardGame';
import reactLogo from './react-logo.svg';
import './styles.css';

// == Composant
const App = () => (
  <div className="app">
    <h1>candy Fauveur</h1>
    <BoardGame />
  </div>
);

// == Export
export default App;
