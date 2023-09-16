import * as c from './classes';
import * as gb from './boardModule';
import * as p from './playerModule';
import * as out from './outModule';

const getModels = (gb) => {
  const size = gb.length;
  const models = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      models.push(gb[i][j]);
    }
  }
  return models;
};
const cpu = () => {
  let atkList = [];
  let input = new c.Model({
    data: undefined
  });
  const getInput = () => {
    return input;
  };
  const randomize = (arr) => {
    let tmpArr = [];

    for (let i = 99; i >= 0; --i) {
      let tmp = Math.floor(Math.random() * i);
      tmpArr.push(arr.splice(arr.indexOf(arr[tmp]), 1)[0]);
    }
    return tmpArr;
  };
  const createArr = () => {
    for (let i = 0; i < 100; ++i) {
      atkList.push(i);
    }
    atkList = randomize(atkList);
  };
  const start = () => {
    input.proxy.data = atkList.shift();
  };
  createArr();

  return {
    getInput,
    start
  };
};
const otherDisplay = (p1, p2) => {
  function watcher(fn) {
    timeoutID = undefined;
    const start = () => {
      if (typeof timeoutID === "number") {
        stop();
      }
      timeoutID = setInterval(
        () => fn(),
        1000
      );
    };

    const stop = () => {
      clearInterval(timeoutID);
    };

    return {
      //timeoutID,
      start,
      stop
    };
  }


  return {
    watcher
  };
};
const banner = (player) => {
  const winNode = document.querySelector('.win2');
  winNode.textContent = `${player.name.toUpperCase()} wins!`;
};
const gameStart = () => {
  //const gb = boardModule;
  //const p = playerModule;
  //const out = outModule;
  const SIZE = 10;
  out.createGrid(SIZE, document.querySelector('.p1side .board'));
  out.createGrid(SIZE, document.querySelector('.cpuside .board'));
  document.querySelector('.win2').textContent = 'Click on cpu tile to start...';

  const p1board = gb.gameboard();
  const p1 = p.player(p1board, 'player 1');
  p1.setTurn(true);

  const p2board = gb.gameboard();
  const p2 = p.player(p2board, 'cpu');
  const cpu1 = cpu();

  let p2Callback = (v) => {
    // simulate delay
    setTimeout(() => {
      p2.attack(p1, Math.floor(v / SIZE), v % SIZE);
      if (p1.noShip()) banner(p2);
    }, 500);
  };
  const p1Screen = new out.ScreenController(document.querySelectorAll('.p1side button'));
  p1Screen.display(getModels(p1board.getBoard()));
  let p2ClickInput = cpu1.getInput();//p1Screen.getInput();
  p2ClickInput.add(p2Callback);

  let p1Callback = (v) => {
    document.querySelector('.win2').textContent = '';
    let success = p1.attack(p2, Math.floor(v / SIZE), v % SIZE);
    if (p2.noShip()) banner(p1);
    //cpu start...
    if (success) cpu1.start();
  };
  const cpuScreen = new out.ScreenController(document.querySelectorAll('.cpuside button'), true);
  cpuScreen.display(getModels(p2board.getBoard()));
  let p1ClickInput = cpuScreen.getInput();
  p1ClickInput.add(p1Callback);



};

export {
  gameStart
}