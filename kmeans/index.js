const KMeans = require('./kmeans');
const { points_2d_few } = require('./data');

const solver = new KMeans({k: 2, data: points_2d_few});
console.log(solver.centroidList);
