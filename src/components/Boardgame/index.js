// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './styles.css';
import blank from '../../assets/caca.jpg';

// == Composant
const BoardGame = ({
  candyColors,
  width,
  randColors,
  colorArrangement,
  modifyColorBlank,
  squareBeingDragged,
  squareBeingReplaced,
  squareReplaced,
  squareDragged,
  addScore,
  score,
  setScoreTrueOrFalse,
  scoreTrueOrFalse,
  movement,
 setMovement, }) => {


// chexk des colonne si 4 couleur identique
const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = colorArrangement[i];
      const isBlank = colorArrangement[i] === blank

      if (columnOfFour.every( square => colorArrangement[square] === decidedColor && !isBlank)) {
        columnOfFour.forEach(square => colorArrangement[square] = blank)
        if (scoreTrueOrFalse) {
          addScore(score + 4);
        }
        return true
      }
    }
}


  // chexk des ligne si 3 couleur identique
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = colorArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]; 
      const isBlank = colorArrangement[i] === blank

      if (notValid.includes(i)) continue;
      
      if (RowOfFour.every(square => colorArrangement[square] === decidedColor && !isBlank)) {
        RowOfFour.forEach(square => colorArrangement[square] = blank)

        const colorFilterScore = colorArrangement.filter( item => item === blank )
        if (scoreTrueOrFalse) {
          addScore(score + 4)
        }
      }
    }
  }

    // chexk des colonne si 4 couleur identique
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = colorArrangement[i];
      const isBlank = colorArrangement[i] === blank
      if (columnOfThree.every( square => colorArrangement[square] === decidedColor && !isBlank)) {
        if (scoreTrueOrFalse) {
          addScore(score + 3)   
        }
        console.log(columnOfThree[0], 'premier caré')
        columnOfThree.forEach(square => colorArrangement[square] = blank)
        return true;
      }
    }
  };


  // chexk des ligne si 3 couleur identique
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfThree = [i, i + 1, i + 2];
      const decidedColor = colorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]; 
      const isBlank = colorArrangement[i] === blank

      if (notValid.includes(i)) continue;
      
      if (RowOfThree.every(square => colorArrangement[square] === decidedColor && !isBlank)) {
        if (scoreTrueOrFalse) {
          addScore(score + 3)
        }
        RowOfThree.forEach(square => colorArrangement[square] = blank)
      }
    }
  }



  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      // remplace les premier carré vidé par des plein de facon random
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      if (firstRow.includes(i) && colorArrangement[i] === blank) {
        const randomNUmber = Math.floor(Math.random() * candyColors.length);
        colorArrangement[i] = candyColors[randomNUmber];
      }
      // si un carré est vide en dessous d'une couleur la couleur descend 
      if (colorArrangement[i + width] === blank) {
        colorArrangement[i + width] = colorArrangement[i];
        colorArrangement[i] = blank;
      }
    }
  }

  //fonction de deplacement drag and drop
  // fonction debut de l'evenement a la  prise d'un element
  const dragStart = (e) => {
    //console.log('drag start', e.target);
    if (movement >= 1) {
      squareBeingDragged(e.target);   
    }
  };
    // fonction lacher d'un element
  const dragDrop = (e) => {
    // console.log('drag drop', e.target);
    squareBeingReplaced(e.target);
  };
    // fonction fin de l'evenement 
  const dragEnd = () => {
    // variable qui contient comme attribut l'id de la case porter et celle qui est remplacer
    const squareBeingDraggedId = parseInt(squareDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareReplaced.getAttribute('data-id'))

    // permet de remplacer la couleur du  carrée qui recoit par celle qui est tenue
    colorArrangement[squareBeingReplacedId] = squareDragged.getAttribute('src') ;
    // permet de remplacer la couleur du  carrée qui est tenue par celle qui est recoit
    colorArrangement[squareBeingDraggedId] = squareReplaced.getAttribute('src') ;

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ]

    // si id de la case a coté est valid on deplace si non on annule le deplacement
    if (validMoves.includes(squareBeingReplacedId  ) && movement >= 1) {
      // au premier deplacement permet d'activer le score
      setScoreTrueOrFalse()
      //-1 au
      setMovement();
      console.log('123 valid')
      squareBeingReplaced(null)
      squareBeingDragged(null)
      console.log('move reussi')
    }
    else{
      colorArrangement[squareBeingReplacedId] = squareReplaced.getAttribute('src') ;
      colorArrangement[squareBeingDraggedId] = squareDragged.getAttribute('src') ;
      randColors(colorArrangement);
    }

  };

 // fonction création du plateau de jeu
  const CreateBoard = () => {
    const randomColorArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    randColors(randomColorArrangement);
  }

  useEffect(() => {
    CreateBoard();
    
}, []);



// permet le rafraichisement pour check si des sumbole de 3-4 sont reunie
useEffect(() => {
  const timer = setInterval(() => {

    setTimeout(() => {
      checkForRowOfFour();
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      modifyColorBlank(colorArrangement);
      
    }, 10);
    }, 200 )
  return () => clearInterval(timer)
}, [checkForRowOfFour, checkForColumnOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, colorArrangement]);
 console.log(movement)
  return (
    <div className="main">
      <div className="scoreAndMovement">
        <div className="movement">
          <p>Point de mouvement</p>
          <p className="movement-nombre">{movement}</p>
        </div>
        <div>
          <p>Score</p>
          <p className="score">{score} </p>
        </div>
       </div>
    <div className="game">
      {colorArrangement.map((color, index) => (
        <img
          key={index}
          //style={{backgroundColor: color }}ff
          src={color}
          alt={color}
          data-id={index}
          draggable="true"
          onDragStart={dragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
        />
           )) }
    </div>
    </div>
  );
}


// == Export
export default BoardGame;
