const {
  areElementsEqual,
  firstElement,
  lastElement
} = require('../array');

const {
  mean,
  randomBetween
} = require('../math');

const {
  dimensionality,
  distance
} = require('../geometry');

class KMeans {
  constructor ({k, pointList}) {
    this.k = k;
    this.pointList = pointList;
    this.pointCount = pointList.length;
    this.dimensionality = dimensionality(firstElement(this.pointList));
    this.reset();
  }

  reset () {
    this.error = null;
    this.iterationCount = 0;
    this.iterationLogList = [];
    this.centroidList = this.initRandomCentroids(); // centroid point by centroid index
    this.assignment = []; // assigned centroid index by point index
  }

  initRandomCentroids () {
    const rangeByDimension = this.calculateRangeByDimension()
    const centroidList = [];
    for (let i = 0; i < this.k; ++i) {
      const point = [];
      for (let d = 0; d < this.dimensionality; ++d) {
        const {min, max} = rangeByDimension[d];
        point[d] = randomBetween(min, max);
      }
      centroidList.push(point);
    }
    return centroidList;
  }

  calculateRangeByDimension () {
    const rangeByDimension = [];
    for (let d = 0; d < this.dimensionality; ++d) {
      rangeByDimension[d] = this.getRangeForDimension(d);
    }
    return rangeByDimension;
  }

  getRangeForDimension (d) {
    const valueList = this.pointList.map(point => point[d]);
    return {
      min: Math.min.apply(null, valueList),
      max: Math.max.apply(null, valueList)
    }
  }

  solve({ maxIterationCount = 1000 } = {}) {
    while (this.iterationCount < maxIterationCount) {
      const previousAssignment = this.assignment;
      this.assignment = this.calculateAssignment(this.pointList, this.centroidList);
      const isAssignmentUnchanged = this.isAssignmentUnchanged(previousAssignment, this.assignment);
      this.centroidList = this.calculateCentroidPosition(this.assignment);
      this.error = this.calculateError(this.centroidList, this.assignment);
      this.iterationLogList[this.iterationCount] = {
        k: this.k,
        centroidList: this.centroidList,
        iteration: this.iterationCount,
        error: this.error,
        didReachSteadyState: isAssignmentUnchanged
      };
      if (isAssignmentUnchanged) {
        break;
      }
      ++this.iterationCount;
    }
    return lastElement(this.iterationLogList);
  }

  calculateAssignment (pointList, centroidList) {
    const assignment = [];
    for (let i = 0; i < this.pointCount; ++i) {
      assignment[i] = this.calculatePointAssignment(pointList[i], centroidList);
    }
    return assignment;
  }

  calculatePointAssignment(point, centroidList) {
    let minDistance = null;
    let assignedCentroid = null;
    for (let i = 0; i < this.k; ++i) {
      const centroid = centroidList[i];
      const distanceToCentroid = distance(point, centroid);
      if (minDistance === null || distanceToCentroid < minDistance) {
        minDistance = distanceToCentroid;
        assignedCentroid = i;
      }
    }
    return assignedCentroid;
  }

  isAssignmentUnchanged(previousAssignment, nextAssignment) {
    return areElementsEqual(previousAssignment, nextAssignment);
  }

  calculateCentroidPosition(assignment) {
    const centroidList = [];
    for (let i = 0; i < this.k; ++i) {
      const assignedPointList = this.getAssignedPointList(assignment, i);
      const centroid = [];
      for (let d = 0; d < this.dimensionality; ++d) {
        const valueInThisDimensionList = assignedPointList.map(p => p[d]);
        centroid[d] = mean(valueInThisDimensionList);
      }
      centroidList[i] = centroid;
    }
    return centroidList;
  }

  getAssignedPointList (assignment, centroidIndex) {
    const assignedPointList = [];
    for (let i = 0; i < this.pointCount; ++i) {
      if (assignment[i] === centroidIndex) {
        assignedPointList.push(this.pointList[i]);
      }
    }
    return assignedPointList;
  }

  calculateError (centroidList, assignment) {
    let sumDistanceSquared = 0;
    for (let i = 0; i < this.pointCount; ++i) {
      const centroidIndex = assignment[i];
      const centroid = centroidList[centroidIndex];
      const point = this.pointList[i];
      const thisDistance = distance(point, centroid) + this.k; // Note: penalize larger k when auto solving for k
      sumDistanceSquared += thisDistance * thisDistance;
    }
    const error = Math.sqrt(sumDistanceSquared / this.pointCount);
    return error;
  }
}

module.exports = KMeans;
