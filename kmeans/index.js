const KMeans = require('./kmeans');
const {
  points_2d_3groups,
  points_2d_few
} = require('./data');

// const { k, pointList } = { k: 2, pointList: points_2d_few };
const { k, pointList } = { k: 3, pointList: points_2d_3groups };
const solver = new KMeans({ k, pointList });
const centroidList = solver.solve();
// solver.iterationLogList.forEach(log => console.log(log));
console.log(centroidList);
