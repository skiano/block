
var _ = require('lodash'),
  d = {x: 'x', y: 'y'};

// TODO: handle rotation

function Block (dimensions, options) {

  options = _.extend({
    step: 0,
    direction: d.y,
    rotate: 0, // 90, -90, 180
  }, options);

  this.get = function (px, py) {
    p = arguments.length === 2 ? [px,py] : px;
    return inBlock(p, dimensions) ? p : findPoint(p, dimensions, options);
  };

}

module.exports = function (dimensions, options) {
  return new Block(dimensions, options);
};

/*
 * Utilities
 */

function inBlock (p, dimensions) {
  return p[0] >= 0 &&
         p[0] < dimensions[0] &&
         p[1] >= 0 &&
         p[1] < dimensions[1];
}

function findPoint (p, dim, options) {

  var x = p[0],
    y = p[1],
    w = dim[0],
    h = dim[1],
    stepShiftX = 0,
    stepShiftY = 0;

  // decide shift amount
  if (options.direction === d.x) {
    stepShiftX = Math.floor(y / h);
  } else {
    stepShiftY = Math.floor(x / w);
  }

  // account for shift
  x = x + stepShiftX * options.step;
  y = y + stepShiftY * options.step;

  // account for overflow
  x = x >= 0 ? x % w : w - (Math.abs(x+1) % w) - 1;
  y = y >= 0 ? y % h : h - (Math.abs(y+1) % h) - 1;

  return [x,y];
}