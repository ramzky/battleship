import * as c from './classes';
import * as s from './shipModule';

const patternChecker = (board, cx, cy, length = 2, player = '-') => {
  let temp = player;
  let isTherePattern = false;
  let row = 10; //SIZE
  let column = row;
  const horiArray = [];
  const verArray = [];

  const check = () => isTherePattern;

  //horizontal
  if (length <= column) {
    //if (cy <= column-length) {
    let tempCol = cy;
    let horizontal = 0;

    for (let k = 0; k < length; k++) {
      if (board[cx][tempCol].proxy.data === temp) {
        ++horizontal;
        horiArray.push([cx, tempCol]);
      }
      if (horizontal === length) isTherePattern = true;
      tempCol++;
    }
    //}
  }

  //vertical
  if (length <= row) {
    //if (cx <= row-length) {
    let tempRow = cx;
    let vertical = 0;

    for (let k = 0; k < length; k++) {
      if (board[tempRow][cy].proxy.data === temp) {
        ++vertical;
        verArray.push([tempRow, cy]);
      }
      if (vertical === length) isTherePattern = true;
      tempRow++;
    }
    //}
  }
  if (horiArray.length === length &&
    verArray.length === length) {
    let rand = Math.floor(Math.random() * 2);
    return rand === 0 ? horiArray : verArray;
  }
  if (horiArray.length === length) return horiArray;
  if (verArray.length === length) return verArray;
  return [];
};
const board = (size = 10) => {
  const boardArr = [];
  for (let i = 0; i < size; i++) {
    boardArr[i] = [];
    for (let j = 0; j < size; j++) {
      boardArr[i].push(new c.Model({ data: '-' }));
    }
  }
  return boardArr;
};

const gameboard = () => {
  const battleboard = board();
  const ships = [];
  const atkList = [];

  const getBoard = () => battleboard;
  const getBoardValue = (cX, cY) => {
    return battleboard[cX][cY].proxy.data;
  };
  const checkAtk = (cX, cY) => {
    return atkList.includes(`${cX},${cY}`) ? true : false;
  }
  const shipIsHit = (cX, cY) => {
    return typeof battleboard[cX][cY].proxy.data === 'number' ? true : false;
  };
  const allSunk = () => {
    return ships.filter((ship) => !ship.isSunk()).length <= 0 ? true : false;
  };
  const receiveAttack = (cX, cY) => {

    // check if ship is hit
    if (shipIsHit(cX, cY)) {
      ships[battleboard[cX][cY].proxy.data].hit();
    }
    battleboard[cX][cY].proxy.data = 'X';
    atkList.push(`${cX},${cY}`);
  };
  const setCoordinates = (shipIndex, len) => {
    let point = ((10 - len) + 1); //(size - len) + 1
    let cx = Math.trunc(Math.random() * point);
    let cy = Math.trunc(Math.random() * point);
    let indexes = [];
    while (indexes.length === 0) {
      indexes = patternChecker(battleboard, cx, cy, len);
      cx = Math.trunc(Math.random() * point);
      cy = Math.trunc(Math.random() * point);
    }
    //console.log(indexes);
    indexes.forEach((index) =>
      battleboard[index[0]][index[1]].proxy.data = shipIndex);

  };
  const init = () => {
    //init ships here
    //const s = shipModule;
    let shipCount = 6
    for (let i = 0; i < shipCount; i++) {
      if (i < 4) ships[i] = s.ship(3);
      else ships[i] = s.ship();
      //set coordinates of ships..
      setCoordinates(i, ships[i].getLength());
    }
  };
  init();

  return {
    receiveAttack,
    getBoardValue,
    allSunk,
    getBoard,
    checkAtk
  };
};

export {
  gameboard
};