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
  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      // remplace les premier carré vidé par des plein de facon random
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      if (firstRow.includes(i) && colorArrangement[i] === blank) {
        const randomNUmber = Math.floor(Math.random() * candyColors.length);
        colorArrangement[i] = candyColors[randomNUmber][0];
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
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)][0]
      randomColorArrangement.push(randomColor)
    }
    randColors(randomColorArrangement);
  };

  useEffect(() => {
    CreateBoard();
}, []);

  const check = () => {
    //declarer variable score
    const arrayScore = [];
    // pour chaque case effectuer le test si une collone de 3 est faites
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const columnOfFive = [i, i + width, i + width * 2, i + width * 3 + width * 4];
      const decidedColor = colorArrangement[i];
      const isBlank = colorArrangement[i] === blank
      // regarder si colonne de 3 meme couleur et n'est pas 'blanc'
      if (columnOfThree.every( square => colorArrangement[square] === decidedColor && !isBlank)) {
        // verifier si un colonne de 4 est possible
        if (columnOfFour.every( square => colorArrangement[square] === decidedColor && !isBlank)) {
          // verifier si un colonne de 5 est possible
          if (columnOfFive.every( square => colorArrangement[square] === decidedColor && !isBlank)) {
            // si oui ajouter la case 5 dans score
            for (let i = 0; i <= 4; i++) {
              arrayScore.push(columnOfFive[i]);
            }
          }
          else {
            //si c'est pas le cas ajouter la case a la variable  score (4)
            for (let i = 0; i <= 3; i++) {
              arrayScore.push(columnOfFour[i]);
            }
          }
        }
        else {
          // si non sortie de la condition et ajouter les 3 case
          for (let i = 0; i <= 2; i++) {
            arrayScore.push(columnOfThree[i]);
          }
        }
      }
    }
    // pour chaque case effectuer le test si une collone de 3 est faites
    for (let i = 0; i < 64; i++) {
      const RowOfThree = [i, i + 1, i + 2];
      const RowOfFour = [i, i + 1, i + 2, i + 3];
      const RowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
      const decidedColor = colorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]; 
      const isBlank = colorArrangement[i] === blank
      // regarder si ligne de 3 et n'est pas 'blanc'
      if (notValid.includes(i)) continue;
      if (RowOfThree.every(square => colorArrangement[square] === decidedColor && !isBlank)) {
        // verifier si colonne de 4 est possible
        if (RowOfFour.every(square => colorArrangement[square] === decidedColor && !isBlank)) {
          // verifier si une ligne de 5 est possible
          if (RowOfFive.every(square => colorArrangement[square] === decidedColor && !isBlank)) {
            // si oui ajouter la case +5 au score
            for (let i = 0; i <= 4; i++) {
              arrayScore.push(RowOfFive[i]);
            }
          } else {
            // si non ajouter +4
            for (let i = 0; i <= 3; i++) {
              arrayScore.push(RowOfFour[i]) 
            }
          } 
        }
        else{
          // si c'est pas le cas ajouter la case a la variable score + 3
          for (let i = 0; i <= 2; i++) {
            arrayScore.push(RowOfThree[i]) 
          }
        }  
      }
    }
    // si le tableau ne contient plus de ligne/colonne du a la generation
    if (scoreTrueOrFalse) {
      // prendre la variable arrayScore et ajouter le nombre d'element au score
      const filterArrayScore = arrayScore.filter((item, index) => (
        arrayScore.indexOf(item) === index
      ));
      console.log(filterArrayScore, ' filter')
      addScore(score + filterArrayScore.length) 
    }
    arrayScore.forEach(square => colorArrangement[square] = blank);
    
  };

// permet le rafraichisement pour check si des sumbole de 3-4 sont reunie
useEffect(() => {
  const timer = setInterval(() => {
      check()
      moveIntoSquareBelow();
      modifyColorBlank(colorArrangement);    
    }, 100 )
  return () => clearInterval(timer)
}, [moveIntoSquareBelow, colorArrangement, check]);
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
