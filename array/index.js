function areElementsEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function firstElement(a) {
  return a[0];
}

function lastElement(a) {
  return a[a.length - 1];
}

module.exports = {
  areElementsEqual,
  firstElement,
  lastElement
};
