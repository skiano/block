
var _ = require('lodash');

function getX (p) { return p[0]; }
function getY (p) { return p[1]; }

function Block (dimensions, options) {

  var blockW = dimensions[0],
    blockH = dimensions[1];

  options = _.extend({
    step: 0,
    direction: 'y',
    rotate: 0, // 90, -90, 180
  }, options);

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

    var x = getX(p),
      y = getY(p),
      cell = getCell(p),
      stepShiftX = 0,
      stepShiftY = 0;

    // decide shift amount
    if (isHorizontal(options)) {
      stepShiftX = cell.y * options.step;
    } else {
      stepShiftY = cell.x * options.step;
    }

    // account for shift
    x = x + stepShiftX;
    y = y + stepShiftY;

    // account for overflow
    x = x >= 0 ? x % blockW : blockW - (Math.abs(x+1) % blockW) - 1;
    y = y >= 0 ? y % blockH : blockH - (Math.abs(y+1) % blockH) - 1;

    if (options.rotate === 180) {

      if ((Math.floor(p[0]/blockW)%2 === 1 && Math.floor(p[1]/blockH)%2 === 0) ||
          (Math.floor(p[0]/blockW)%2 === 0 && Math.floor(p[1]/blockH)%2 === 1)) {
        x = blockW - x - 1;
        y = blockH - y - 1;
      }
      
    }

    return [x,y];
  }

}

module.exports = function (dimensions, options) {
  return new Block(dimensions, options);
};
