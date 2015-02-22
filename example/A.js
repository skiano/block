
var rand = require('random-seed').create(),
  block = require('../block'),
  dim = [10,10],
  b = block(dim);

var movements = [
  [1,0],   // up
  [-1,0],  // down
  [0,1],   // right
  [0,-1],  // left
  [1,1],   // up-right
  [-1,1],  // up-left
  [1,-1],  // down-right
  [-1,-1]  // down-left
];

function nextMove (current) {
  var move = movements[rand.intBetween(0, movements.length-1)];
  return [
    current[0] + move[0],
    current[1] + move[1]
  ];
}

var point = [
  rand.intBetween(0,dim[0]-1),
  rand.intBetween(0,dim[1]-1)
];

var blockPoints = [],
  i;
for (i = 0; i < 23; i += 1) {
  point = nextMove(point);
  blockPoints.push(b.get(point));
}

console.log(blockPoints);