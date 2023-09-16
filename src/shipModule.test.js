const ship = require('./shipModule');

const myShip = ship();

test('is sunk', () => {
  expect(myShip.isSunk()).toBe(false);
})

test('hit', () => {
  expect(myShip.hit()).toBe(1);
})

test('hit again', () => {
  expect(myShip.hit()).toBe(2);
})

test('is sunk now', () => {
  expect(myShip.isSunk()).toBe(true);
})