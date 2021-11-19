// == Import npm
import React from 'react';

// == Import
// import Counter from 'src/containers/Counter';
import BoardGame from 'src/containers/BoardGame';
import Header from '../Header';
import './styles.css';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <BoardGame />
  </div>
);

// == Export
export default App;
