
var _ = require('lodash'),
  rand = require('random-seed').create(),
  block = require('../block'),
  dim = [16,8],
  step = 3,
  b = block(dim, {
    step: step,
    direction: 'x'
  });

function nextMove (current, moves) {
  var move = moves[rand.intBetween(0, moves.length-1)];
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
      return ' ';
    });
  });

  blockPoints.forEach(function (p) {
    grid[p[1]][p[0]] = 'M';
  });

  return '\n' + new Array(repeatY + 1 ).join(
    _.map(grid, function (row, idx) {

      // var shift = step * idx,
      //   str = subStr = 


      return '  ' + new Array( repeatX + 1 ).join(row.join(''));
    }).join('\n') + '\n'
  );
}

var movements = [
  [-1,-1],
  // [1,0],
  // [0,1]
];

var point = [
  rand.intBetween(0,dim[0]-1),
  rand.intBetween(0,dim[1]-1)
];

var blockPoints = [],
  i;
for (i = 0; i < rand.intBetween(20, 239); i += 1) {
  point = nextMove(point, movements);
  blockPoints.push(b.get(point));
}


// var movements2 = [
//   [1,0],
//   [1,1],
//   [1,0],
//   [1,0],
//   [1,0]
// ];

// var point2 = [
//   rand.intBetween(0,dim[0]-1),
//   rand.intBetween(0,dim[1]-1)
// ];

// for (i = 0; i < rand.intBetween(10, 100); i += 1) {
//   point2 = nextMove(point2, movements2);
//   blockPoints.push(b.get(point2));
// }

// var movements3 = [
//   [0,1],
//   [0,1],
//   [0,1],
//   [0,1],
//   [0,1],
//   [0,1],
//   [1,2],
// ];

// var point3 = [
//   rand.intBetween(0,dim[0]-1),
//   rand.intBetween(0,dim[1]-1)
// ];

// for (i = 0; i < rand.intBetween(3, 80); i += 1) {
//   point3 = nextMove(point3, movements3);
//   blockPoints.push(b.get(point3));
// }


var str = printBlock(blockPoints, 9, 3);

console.log(str);

// console.log(blockPoints);


