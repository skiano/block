
var _ = require('lodash');

var blockVariants = {
  'none': ['0'],
  'half': ['0', '1/2'],
  'clockwise': ['0', '1/4', '1/2', '3/4'],
  'counterClockwise': ['0', '1/4', '1/2', '3/4']
};

var rotators = {
  
  '0': function (x,y) {
    return [x,y];
  },

  '1/2': function (x,y,w,h) {
    x = w - x - 1;
    y = h - y - 1;
    return [x,y];
  }

};

function getX (p) { return p[0]; }
function getY (p) { return p[1]; }

function getLoopPosition (idx, loopLength) {
  return idx >= 0 ? idx % loopLength : loopLength - (Math.abs(idx+1) % loopLength) - 1;
}

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
      stepShiftX = isHorizontal() ? cell.y * options.step : 0,
      stepShiftY = isVertical() ? cell.x * options.step : 0,
      x = getX(p) + stepShiftX,
      y = getY(p) + stepShiftY;

    // compensate for shift
    var shiftedCell = getCell([x,y]),
      blockOrientation = getBlockOrientation(shiftedCell);

    // account for overflow
    x = getLoopPosition(x, blockW);
    y = getLoopPosition(y, blockH);

    return rotators[blockOrientation](x,y,blockW,blockH);
  }

  function getBlockOrientation (cell) {
    var x = getLoopPosition(cell.x, variants.length),
      y = getLoopPosition(cell.y, variants.length);
    return variants[(x + y) % variants.length];
  }

}

module.exports = function (dimensions, options) {
  return new Block(dimensions, options);
};
