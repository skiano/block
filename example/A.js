
var _ = require('lodash'),
  rand = require('random-seed').create(),
  block = require('../block'),
  dim = [24,14],
  b = block(dim, {
    step: 12, // rand.intBetween(-55, 155),
    direction: 'y'
  });

var movements = [
  [1,0],
  // [-1,0],
  [0,1],
  // [0,-1],
  [1,1],
  [-1,1],
  [1,-1],
  [-1,-1],

  [0,2],
  // [0,2],
  // [0,2],
  // [0,2],
  // [0,2],
  // [0,2],
  // [0,2],
  // [0,2],
  // [0,2],
  // [0,2],
  // [0,2],
  // [1,0],
  // [1,0],
  // [1,0],
  // [1,0],
  // [1,0],

];

function nextMove (current) {
  var move = movements[rand.intBetween(0, movements.length-1)];
  return [
    current[0] + move[0],
    current[1] + move[1]
  ];
}

function printBlock (blockPoints, repeatX, repeatY) {
  repeatX = repeatX || 1;
  repeatY = repeatY || 1;

  var grid = _.map(_.range(0,dim[1]), function (i) {
    return _.map(_.range(0,dim[0]), function (i) {
      return '.';
    });
  });

  blockPoints.forEach(function (p) {
    grid[p[1]][p[0]] = '}';
  });

  return '\n' + new Array(repeatY + 1 ).join(
    _.map(grid, function (row) {
      return '  ' + new Array( repeatX + 1 ).join(row.join(''));
    }).join('\n') + '\n'
  );
}

var point = [
  rand.intBetween(0,dim[0]-1),
  rand.intBetween(0,dim[1]-1)
];

var blockPoints = [],
  i;
for (i = 0; i < rand.intBetween(60, 190); i += 1) {
  point = nextMove(point);
  blockPoints.push(b.get(point));
}


var str = printBlock(blockPoints, 5, 3);

console.log(str);

// console.log(blockPoints);


