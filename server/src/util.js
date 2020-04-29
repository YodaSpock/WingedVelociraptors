const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

const shuffle = (arr) => {
  for(let i = arr.length - 1; i >= 1; i--) {
    let j = randInt(0, i + 1);
    swap(arr, i, j);
  }
}

module.exports = { shuffle };
