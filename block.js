
var _ = require('lodash'),
  d = {x: 'x', y: 'y'};

function Block (dimensions, options) {

  options = _.extend({
    step: 0,
    direction: d.y,
    rotate: 0,
    mirror: true
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

  var stepShiftX = 0,
    stepShiftY = 0;

  if (options.direction === d.x) {
    stepShiftX = Math.floor(p[1] / dim[1]) * options.step;
  } else {
    stepShiftY = Math.floor(p[0] / dim[0]) * options.step;
  }

  var x = p[0] + stepShiftX,
    y = p[1] + stepShiftY;

  x = x >= 0 ? x % dim[0] : dim[0] + (x % dim[0]);
  y = y >= 0 ? y % dim[1] : dim[1] + (y % dim[1]);

  return [x,y];
}