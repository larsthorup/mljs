const {randomBetween} = require('../math');

class KMeans {
  constructor ({k, data}) {
    this.k = k;
    this.data = data;
    this.reset();
  }

  reset () {
    this.error = null;
    this.iterationCount = 0;
    this.iterationLogList = [];
    this.centroidList = this.initRandomCentroids();
    this.centroidAssignmentList = [];
  }

  initRandomCentroids () {
    const dimensionality = this.getDimensionality();
    const rangeByDimension = this.calculateRangeByDimension()
    const centroidList = [];
    for (let i = 0; i < this.k; ++i) {
      const point = [];
      for (let d = 0; d < dimensionality; ++d) {
        const {min, max} = rangeByDimension[d];
        point[d] = randomBetween(min, max);
      }
      centroidList.push(point);
    }
    return centroidList;
  }

  getDimensionality () {
    const point = this.data[0];
    return point.length;
  }

  calculateRangeByDimension () {
    const rangeByDimension = [];
    const dimensionality = this.getDimensionality();
    for (let d = 0; d < dimensionality; ++d) {
      rangeByDimension[d] = this.getRangeForDimension(d);
    }
    return rangeByDimension;
  }

  getRangeForDimension (d) {
    const valueList = this.data.map(point => point[d]);
    return {
      min: Math.min.apply(null, valueList),
      max: Math.max.apply(null, valueList)
    }
  }
}

module.exports = KMeans;
