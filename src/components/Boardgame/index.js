// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './styles.css';
import blank from '../../assets/blue-candy.png';

// == Composant
const BoardGame = ({ candyColors, width, randColors, colorArrangement, modifyColorBlank, squareBeingDragged, squareBeingReplaced, squareReplaced, squareDragged, addScore, score }) => {


// chexk des colonne si 4 couleur identique
const checkForColumn = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4];
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = colorArrangement[i];
      const isBlack = colorArrangement[i] === 'black'

      if (columnOfFive.every(square => colorArrangement[square] === decidedColor && !isBlack)) {
        columnOfFive.forEach(square => colorArrangement[square] = 'black')
        console.log('colonne de 5')

        const colorFilterScore = colorArrangement.filter( item => item === 'black' )
        addScore(score + colorFilterScore.length)
      }
      else if (columnOfFour.every( square => colorArrangement[square] === decidedColor && !isBlack)) {
        columnOfFour.forEach(square => colorArrangement[square] = 'black')
        console.log('colonne de 4')
        const colorFilterScore = colorArrangement.filter( item => item === 'black' )
        addScore(score + colorFilterScore.length)
      }
      else if (columnOfThree.every( square => colorArrangement[square] === decidedColor && !isBlack)) {
        columnOfThree.forEach(square => colorArrangement[square] = 'black')
        console.log('colonne de 3', decidedColor, colorArrangement[0] )
        const colorFilterScore = colorArrangement.filter( item => item === 'black' )
        addScore(score + colorFilterScore.length)
        console.log(colorFilterScore)
        
      }
    }
}


  // chexk des ligne si 3 couleur identique
  const checkForRow = () => {
    for (let i = 0; i <= 64; i++) {
      const RowOfFour = [i, i + 1, i + 2, i + 3];
      const RowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
      const RowOfThree = [i, i + 1, i + 2];
      const decidedColor = colorArrangement[i];
      const isBlack = colorArrangement[i] === 'black'
     /*  const notValidFive = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 61, 62, 63, 64];
      const notValidFour = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]; */
      const notValidThree = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      if (notValidThree.includes(i)) continue;
      
      if (RowOfFive.every(square => colorArrangement[square] === decidedColor && !isBlack)) {
        //console.log('row 5')
        RowOfFive.forEach(square => colorArrangement[square] = 'black')
        const colorFilterScore = colorArrangement.filter( item => item === 'black' )
        addScore(score + colorFilterScore.length)
        
      } else if (RowOfFour.every(square => colorArrangement[square] === decidedColor && !isBlack)) {
        RowOfFour.forEach(square => colorArrangement[square] = 'black')

        //console.log('row 4')
        const colorFilterScore = colorArrangement.filter( item => item === 'black' )
        addScore(score + colorFilterScore.length)
      }
      else if (RowOfThree.every(square => colorArrangement[square] === decidedColor && !isBlack )) {
        console.log(RowOfThree.every(square => colorArrangement[square] === decidedColor), RowOfFour.every(square => colorArrangement[square] === decidedColor))
        RowOfThree.forEach(square => colorArrangement[square] = 'black')
        console.log(decidedColor, 'row 3', )
    
        const colorFilterScore = colorArrangement.filter( item => item === 'black' )
        addScore(score + colorFilterScore.length)

      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      // remplace les premier carré vidé par des plein de facon random
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      if (firstRow.includes(i) && colorArrangement[i] === 'black') {
        const randomNUmber = Math.floor(Math.random() * candyColors.length);
        colorArrangement[i] = candyColors[randomNUmber];
      }
      // si un carré est vide en dessous d'une couleur la couleur descend 
      if (colorArrangement[i + width] === 'black') {
        colorArrangement[i + width] = colorArrangement[i];
        colorArrangement[i] = 'black';
      }
    }
  }

  //fonction de deplacement drag and drop
  // fonction debut de l'evenement a la  prise d'un element
  const dragStart = (e) => {
    //console.log('drag start', e.target);
    squareBeingDragged(e.target);
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

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];
    // si id de la case a coté est valid on deplace si non on annule le deplacement
    if (validMoves.includes(squareBeingReplacedId)) {
      // permet de remplacer la couleur du  carrée qui recoit par celle qui est tenue
      colorArrangement[squareBeingReplacedId] = squareDragged.style.backgroundColor ;
      // permet de remplacer la couleur du  carrée qui est tenue par celle qui est recoit
      colorArrangement[squareBeingDraggedId] = squareReplaced.style.backgroundColor ;
      squareBeingReplaced(null)
      squareBeingDragged(null)
      console.log('move reussi')
    }
    else{
      colorArrangement[squareBeingReplacedId] = squareReplaced.style.backgroundColor ;
      colorArrangement[squareBeingDraggedId] = squareDragged.style.backgroundColor ;
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

    console.log(colorArrangement.includes(!'black'), colorArrangement.includes('black'), )
      if (colorArrangement.includes(!'black') ) {
      }
      checkForRow();
      checkForColumn();
      //checkForColumnOfThree();
      //checkForRowOfThree();
      moveIntoSquareBelow();
      modifyColorBlank(colorArrangement);
    }, 1000 )
  return () => clearInterval(timer)
}, [checkForColumn, , checkForRow, moveIntoSquareBelow, colorArrangement]);

  return (
    <div>
    <p>{score} </p>
    <button type="button" onClick={checkForColumn}>⇩</button>
    <div className="game">
      {colorArrangement.map((color, index) => (
        <img
          key={index}
          style={{backgroundColor: color }}
          //src={color}
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
