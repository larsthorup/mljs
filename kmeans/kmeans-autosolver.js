const KMeans = require("./kmeans");

class KMeansAutoSolver {
  constructor({ kMin = 1, kMax = 5, trialLimit = 5, pointList } = {}) {
    this.kMin = kMin;
    this.kMax = kMax;
    this.trialLimit = trialLimit;
    this.pointList = pointList;
    this.reset();
  }

  reset() {
    this.bestSolution = null;
    this.log = [];
  }

  solve({ maxIterationCount = 1000 } = {}) {
    for (let k = this.kMin; k < this.kMax; ++k) {
      for (let trial = 0; trial < this.trialLimit; ++trial) {
        const solver = new KMeans({ k, pointList: this.pointList });
        const solution = solver.solve({ maxIterationCount });
        solution.trial = trial;
        this.log.push(solution);
        if (
          this.bestSolution === null ||
          solution.error < this.bestSolution.error
        ) {
          this.bestSolution = solution;
        }
      }
    }
    return this.bestSolution;
  }
}

module.exports = KMeansAutoSolver;
