import { addScore, colorArrangement } from "../../actions/boardgameAction";

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
          arrayScore.push(columnOfFive);
        }
        else {
          //si c'est pas le cas ajouter la case a la variable  score (4)
          arrayScore.push(columnOfFour);
        }
      }
      else {
        // si non sortie de la condition et ajouter les 3 case
        arrayScore.push(columnOfThree);
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
    if (RowOfThree.every(square => colorArrangement[square] === decidedColor && !isBlank) {
      // verifier si colonne de 4 est possible
      if (RowOfFour.every(square => colorArrangement[square] === decidedColor && !isBlank)) {
        // verifier si une ligne de 5 est possible
        if (RowOfFive.every(square => colorArrangement[square] === decidedColor && !isBlank)) {
          // si oui ajouter la case +5 au score
          arrayScore.push(RowOfFive)
        } else {
          // si non ajouter +4
          arrayScore.push(RowOfFour)
        } 
      }
      else{
        // si c'est pas le cas ajouter la case a la variable score + 3
        arrayScore.push(RowOfThree)
      }  
    }
  }
  // si le tableau ne contient plus de ligne/colonne du a la generation
  if (scoreTrueOrFalse) {
    // prendre la variable arrayScore et ajouter le nombre d'element au score
    addScore(arrayScore.length) 
  }
  arrayScore.forEach(square => colorArrangement[square] = blank);
  arrayScore = [];
};
