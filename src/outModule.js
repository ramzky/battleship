import * as c from './classes';

class ScreenController {
  constructor(containerList, cpu = false) {
    this.containerList = containerList;
    this.#cpu = cpu;
  }
  #cpu = false;
  #input = new c.Model({
    data: undefined
  });
  #execute(event) {
    this.#input.proxy.data = parseInt(event.target.dataset.index);
  }
  #processModels(models) {
    const views = Array.from(this.containerList).map((v) => new c.View(v));

    //views and models must equal length
    for (let i = 0; i < views.length; i++) {
      views[i].listenTo(models[i]).onChange((container, value, oldValue) => {
        //container.textContent = value;
        container.classList.add('miss');
        if (typeof oldValue === 'number') container.classList.add('hit');
      });
      views[i].el('click', (e) => this.#execute(e));
      //views[i].container.textContent = models[i].proxy.data;
      views[i].container.setAttribute('data-index', i);
      let tmp = models[i].proxy.data;
      if (typeof tmp === 'number') {
        if (!this.#cpu) views[i].container.classList.add('ship');
      }
    }
  }

  //public interfaces...
  getInput() {
    return this.#input;
  }
  display(modelList, handler) {
    if (handler) handler(modelList, this.containerList);
    else this.#processModels(modelList);
  }
}

function createGrid(gridSize = 10, node) {
  const grids = [];
  const gridsBtn = [];
  const gridContainer = node;
  const containerWidth = window.getComputedStyle(gridContainer).getPropertyValue('width');
  const gridWidth = parseInt(containerWidth, 10) / gridSize;
  const gridHeight = gridWidth;
  for (let i = 0; i < gridSize ** 2; i++) {
    grids.push(document.createElement('div'));
    gridsBtn.push(document.createElement('button'));
    grids[i].style.cssText = `width: ${gridWidth}px;height: ${gridWidth}px;`;
    grids[i].classList.add('cell');

    gridContainer.appendChild(grids[i]);
    grids[i].appendChild(gridsBtn[i]);
  }
}

export {
  ScreenController,
  createGrid
};