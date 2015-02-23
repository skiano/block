var block = require('../block'),
  rand = require('random-seed').create(),
  VOID = ' ',
  DEFAULT_GLYPH = 'X';

function AsciiBlock (dimensions, options) {

  var b = block(dimensions, options),
    marks = {};

  this.mark = function (point, glyph) {
    glyph = glyph || DEFAULT_GLYPH;
    marks[b.get(point).join('.')] = glyph;
  };
  
  this.render = function (w, h, offsetX, offsetY) {
    
    w = w || dimensions[0];
    h = h || dimensions[1];
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;

    var rowMarks = [],
      columnMarks,
      y,
      x;

    for (y = 0; y < h; y += 1) {
      columnMarks = [];
      for (x = 0; x < w; x += 1) {
        var c = b.get(x + offsetX, y + offsetY).join('.');
        columnMarks.push(marks[c] || VOID);
      }
      rowMarks.push(columnMarks.join(''));
    }

    return rowMarks.join('\n');

  };

}

var pen = function (point) {
  return [
    point[0] + 1,
    point[1] + 1,
  ];
};

var a = new AsciiBlock([14,13], {
  step: 3,
  direction: 'y'
});

// var i;
// for (i = 0; i < 10; i += 1) {
//   a.mark([0,1], 'X');
// }

a.mark([0,1], 'X');
a.mark([2,2], 'O');
a.mark([3,0], '_');
a.mark([2,0], '_');
a.mark([1,0], '_');
a.mark([-1,0], '_');

var str = a.render(100,20, 0, -2);
console.log(str);



