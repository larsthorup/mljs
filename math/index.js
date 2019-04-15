function mean(numberList) {
  return sum(numberList) / numberList.length;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function sum(numberList) {
  return numberList.reduce((sum, number) => sum + number, 0);
}

module.exports = {
  mean,
  randomBetween,
  sum
};
