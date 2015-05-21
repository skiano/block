
var _ = require('lodash');

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

  var blockW = dimensions[0],
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
      x = getX(p) - stepShiftX,
      y = getY(p) - stepShiftY;

    // account for overflow
    x = getLoopPosition(x, blockW);
    y = getLoopPosition(y, blockH);

    return [x,y];
  }
}

module.exports = function (dimensions, options) {
  return new Block(dimensions, options);
};
