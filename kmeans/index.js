const KMeans = require('./kmeans');
const KMeansAutoSolver = require('./kmeans-autosolver');
const {
  points_2d_3groups,
  points_2d_few,
  points_2d_nok,
  points_3d_3groups
} = require('./data');

const trialCount = 10;

// const { k, pointList } = { k: 2, pointList: points_2d_few };
// const { k, pointList } = { k: 3, pointList: points_2d_3groups };
// const { k, pointList } = { k: 3, pointList: points_3d_3groups };
// const solver = new KMeans({ k, pointList });
// for (let i = 0; i < trialCount; ++i) {
//   solver.reset();
//   const { centroidList, error } = solver.solve();
//   // solver.iterationLogList.forEach(log => console.log(log));
//   console.log(error, centroidList);
// }

const pointList = points_2d_nok;
const autoSolver = new KMeansAutoSolver({ kmin: 1, kMax: 30, pointList});
const solution = autoSolver.solve();
console.log(solution);
