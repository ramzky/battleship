const ship = (length = 2) => {
  let hits = 0;
  const hit = () => ++hits;
  const isSunk = () => hits >= length ? true : false;
  const getLength = () => length;
  return {
    hit,
    isSunk,
    getLength
  };
};

export {
  ship
};
//module.exports = ship;