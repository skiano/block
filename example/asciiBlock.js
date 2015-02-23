var block = require('../block'),
  VOID = ' ',
  DEFAULT_GLYPH = 'X';

function AsciiBlock (dimensions, options) {

  var b = block(dimensions, options),
    marks = {};

  this.width = dimensions[0];
  this.height = dimensions[1];

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

// TESTING

function addPoints (A, B) {
  return [A[0] + B[0], A[1] + B[1]];
}

var rand = require('random-seed').create();

// var a = new AsciiBlock([
//     rand.intBetween(15,51),
//     rand.intBetween(15,51)
//   ], {
//     rotate: 180,
//     step: rand.intBetween(2,25),
//     direction: ['x','y'][rand.intBetween(0,1)]
// });

var a = new AsciiBlock([3,3], {
  rotate: 180
});

// var randMark = (function () {
//   var marks = '..*'.split('');
//   return function () {
//     return marks[rand.intBetween(0,marks.length - 1)];
//   };
// })();

// var i;
// for (i = 0; i < rand.intBetween(43,700); i += 1) {
//   var p = [rand.intBetween(0,a.width), rand.intBetween(0,a.height)];
//   a.mark(p, randMark());
// }

a.mark([0,0], '#');
a.mark([1,1], '$');
a.mark([2,2], ')');

// function line (block) {
//   var x = rand.intBetween(0, block.width);
//   var y;
//   for (y = 0; y < block.height; y += 1) {
//     block.mark([x,y], '*');
//   }
// }

// line(a);

// function cross (point, block) {
//   block.mark(point, '-');
//   block.mark(addPoints(point,[0,1] ), '|');
//   block.mark(addPoints(point,[0,-1]), '|');
//   block.mark(addPoints(point,[0,2]), '|');
//   block.mark(addPoints(point,[1,0] ), '-');
//   block.mark(addPoints(point,[2,0]), '-');
//   block.mark(addPoints(point,[-1,0]), '-');
//   block.mark(addPoints(point,[-2,0] ), '-');
// }

// for (i = 0; i < rand.intBetween(3, 10); i += 1) {
//   var p = [rand.intBetween(0,a.width), rand.intBetween(0,a.height)];
//   cross(p, a);
// }

// function xMark (point, block) {
//   block.mark(point, 'X');
//   block.mark(addPoints(point,[1,1] ), 'X');
//   block.mark(addPoints(point,[-1,-1] ), 'X');
//   block.mark(addPoints(point,[1,-1] ), 'X');
//   block.mark(addPoints(point,[-1,1] ), 'X');
// }

// for (i = 0; i < rand.intBetween(1, 15); i += 1) {
//   var p = [rand.intBetween(0,a.width), rand.intBetween(0,a.height)];
//   xMark(p, a);
// }

// function box (point, block, w, h) {

//   var x, y;
  
//   for (x = 0; x <= w; x += 1) {
//     block.mark(addPoints(point,[x,h]), '\\');
//     block.mark(addPoints(point,[x,0]), '\\');
//   }

//   // for (y = 0; y <= h; y += 1) {
//   //   block.mark(addPoints(point,[w,y]), '|');
//   //   block.mark(addPoints(point,[0,y]), '|');
//   // }

//   // empty out center
//   for (y = 1; y < h; y += 1) {
//     for (x = 0; x <= w; x += 1) {
//       block.mark(addPoints(point, [x,y]), '/');
//     }
//   }

// }

// for (i = 0; i < rand.intBetween(1, 3); i += 1) {
//   var p = [rand.intBetween(0,a.width), rand.intBetween(0,a.height)];
//   var w = rand.intBetween(3,17);
//   var h = rand.intBetween(3,7);
//   box(p, a, w, h);
// }

var str = a.render(12,6, 0, 0);
console.log('\n' + str + '\n');



