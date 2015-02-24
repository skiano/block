
var _ = require('lodash');

var blockVariants = {
  'none': ['0'],
  'half': ['0', '1/2'],
  'clockwise': ['0', '1/4', '1/2', '3/4'],
  'counterClockwise': ['0', '1/4', '1/2', '3/4']
};

function getX (p) { return p[0]; }
function getY (p) { return p[1]; }

function Block (dimensions, options) {

  options = _.extend({
    step: 0,
    direction: 'y',
    rotate: null
  }, options);

  var variants = blockVariants[options.rotate || 'none'],
    blockW = dimensions[0],
    blockH = dimensions[1];

  this.get = function (px, py) {
    p = arguments.length === 2 ? [px,py] : px;
    return findPoint(p);
  };

  function getCell (p) {
    return {
      x: Math.floor(getX(p) / blockW),
      y: Math.floor(getY(p) / blockH)
    };
  }

  function isHorizontal () {
    return options.direction === 'x';
  }

  function isVertical () {
    return options.direction === 'y';
  }

  function findPoint (p) {

    var cell = getCell(p),
      blockOrientation = getBlockOrientation(cell),
      stepShiftX = isHorizontal() ? cell.y * options.step : 0,
      stepShiftY = isVertical() ? cell.x * options.step : 0,
      x = getX(p),
      y = getY(p);

    // account for shift
    x = x + stepShiftX;
    y = y + stepShiftY;

    // account for overflow
    x = x >= 0 ? x % blockW : blockW - (Math.abs(x+1) % blockW) - 1;
    y = y >= 0 ? y % blockH : blockH - (Math.abs(y+1) % blockH) - 1;

    

    switch (blockOrientation) {
      case '0':
        break;

      case '1/4':
        break;

      case '1/2':
        console.log(blockOrientation);
        break;

      case '3/4':
        break;
    }

    if (options.rotate === 'half') {

      if ((cell.x % 2 === 1 && cell.y % 2 === 0) ||
          (cell.x % 2 === 0 && cell.y % 2 === 1)) {
        x = blockW - x - 1;
        y = blockH - y - 1;
      }
      
    }

    return [x,y];
  }

  function getBlockOrientation (cell) {
    return variants[(cell.x + (cell.y % variants.length)) % variants.length];
  }

}

function getBlockOrientation (cell) {
  return variants[(cell.x + (cell.y % variants.length)) % variants.length];
}

// var x, y;
// var variants = ['A','B'];

// for (y = 0; y < 14; y += 1) {

//   var str = [];

//   for (x = 0; x < 14; x += 1) {
//     str.push(getBlockOrientation({x:x,y:y}, variants));
//   }

//   console.log(str.join(' '));

// }


module.exports = function (dimensions, options) {
  return new Block(dimensions, options);
};
