
var _ = require('lodash'),
  D = {X: 'X', Y: 'Y'};

function Block (dimensions, options) {

  options = _.extend({
    step: 0,
    stepDirection: D.Y,
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

  var x = p[0] >= 0 ? p[0] % dim[0] : dim[0] + (p[0] % dim[0]);
  var y = p[1] >= 0 ? p[1] % dim[1] : dim[1] + (p[1] % dim[1]);

  return [x,y];
}