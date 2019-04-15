function dimensionality(p) {
  return p.length;
}

function distance(a, b) {
  if (dimensionality(a) !== dimensionality(b)) {
    throw new Error(
      `Expected b to have dimensionality "${dimensionality(
        a
      )}" but has "${dimensionality(b)}"`
    );
  }
  let sumOfSquares = 0;
  for (let d = 0; d < dimensionality(a); ++d) {
    const diff = b[d] - a[d];
    sumOfSquares += diff * diff;
  }
  return Math.sqrt(sumOfSquares);
}

module.exports = {
  dimensionality,
  distance
};
