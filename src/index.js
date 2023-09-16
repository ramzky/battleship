import * as g from './gameModule';
import './style.css';

//const g = gameModule;
g.gameStart();

const b = document.querySelector('.reset');
b.addEventListener('click', () => {
  document.querySelector('.p1side .board').textContent = '';
  document.querySelector('.cpuside .board').textContent = '';
  g.gameStart();
});