const player = (gameboard, name) => {
  let turn = false;
  const getBoard = () => gameboard;
  const receiveAttack = (cX, cY) => {
    gameboard.receiveAttack(cX, cY);
  };
  const attack = (enemy, cX, cY) => {
    if (turn === true) {
      if (enemy.getBoard().checkAtk(cX, cY)) return;
      enemy.receiveAttack(cX, cY);
      enemy.setTurn(true);
      turn = false;
      if (enemy.noShip()) {
        console.log(`${name} wins!`);
        enemy.setTurn(false);
      }
      return true;
    }
    return false;

  };
  const noShip = () => {
    return gameboard.allSunk() ? true : false;
  };
  const setTurn = (bool) => turn = bool;
  const getTurn = () => turn;
  //const getBoard = () => gameboard.getBoardValue();

  return {
    attack,
    receiveAttack,
    noShip,
    setTurn,
    getTurn,
    getBoard,
    name
  };
};

export {
  player
};