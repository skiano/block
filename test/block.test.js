
var should = require('should'),
  block = require('../block');

describe('Block', function(){
  it('should handle 1 and 2 arguments', function(){
    var b = block([10,10]);

    b.get([0,0]).should.eql([0,0]);
    b.get(0,6).should.eql([0,6]);
  });

  it('should handle overflow', function(){
    var b = block([3,3]);
    
    b.get([-6,-6]).should.eql([0,0]);
    b.get([-3,-3]).should.eql([0,0]);
    b.get([-2,-2]).should.eql([1,1]);
    b.get([-1,-1]).should.eql([2,2]);
    b.get([3,3]).should.eql([0,0]);
    b.get([4,4]).should.eql([1,1]);
    b.get([5,5]).should.eql([2,2]);
    b.get([6,6]).should.eql([0,0]);
  });

  it('should handle step horizontal', function () {
    var b = block([3,3], {
      step: 1,
      direction: 'x'
    });

    b.get(1,-2).should.eql([0,1]);
    b.get(2,-4).should.eql([0,2]);
    b.get(2,-5).should.eql([0,1]);
    b.get(2,-6).should.eql([0,0]);
    b.get(0,4).should.eql([1,1]);
    b.get(2,6).should.eql([1,0]);
  });

  it('should handle step vertical', function () {
    var b = block([3,3], {
      step: 1,
      direction: 'y'
    });

    b.get(-2,1).should.eql([1,0]);
    b.get(-4,2).should.eql([2,0]);
    b.get(-5,2).should.eql([1,0]);
    b.get(-6,2).should.eql([0,0]);
    b.get(4,0).should.eql([1,1]);
    b.get(6,2).should.eql([0,1]);
  });

  it('should `half` rotation', function () {
    var b = block([3,3], {
      rotate: 'half'
    });

    b.get(0,0).should.eql([0,0]);
    b.get(2,1).should.eql([2,1]);
    b.get(1,2).should.eql([1,2]);
    b.get(0,3).should.eql([2,2]);
    b.get(1,4).should.eql([1,1]);
    b.get(3,2).should.eql([2,0]);
    b.get(3,3).should.eql([0,0]);
  });

  it('should `half` rotation with step', function () {
    var b = block([5,5], {
      rotate: 'half',
      step: 2
    });

    b.get(2,4).should.eql([2,4]);
    b.get(1,6).should.eql([3,3]);
    b.get(6,7).should.eql([1,4]);
    b.get(9,-2).should.eql([0,4]);
    b.get(13,2).should.eql([1,3]);
    b.get(-2,2).should.eql([1,4]);
  });

  it('should support `clockwise` rotation', function () {
    var b = block([2,2], {
      rotate: 'clockwise'
    });

    b.get(2,4).should.eql([0,1]);
    b.get(-2,1).should.eql([1,1]);
    b.get(2,0).should.eql([1,0]);
    b.get(3,-2).should.eql([0,1]);
  });

  it('should support `counterClockwise` rotation', function () {
    var b = block([3,3], {
      rotate: 'counterClockwise'
    });

    b.get(3,1).should.eql([1,2]);
  });

  it('should get neighbor points', function(){
    var b = block([5,5]),
      neighbors = b.getNeighbors([2,2]);

    neighbors[0].should.containDeep([
      [1,1],[2,1],[3,1],
      [1,2]   ,   [3,2],
      [1,3],[2,3],[3,3]
    ]);
  });

  it('should get neighbor points', function(){
    var b = block([5,5]),
      neighbors = b.getNeighbors([2,2], 2);

    neighbors[0].should.containDeep([
      [1,1],[2,1],[3,1],
      [1,2]   ,   [3,2],
      [1,3],[2,3],[3,3]
    ]);

    neighbors[1].should.containDeep([
      [0,0],[1,0],[2,0],[3,0],[4,0],
      [0,1]         ,         [4,1],
      [0,2]         ,         [4,2],
      [0,3]         ,         [4,3],
      [0,4],[1,4],[2,4],[3,4],[4,4]
    ]);
  });

  it('should get neighbor points', function(){
    var b = block([5,5]),
      neighbors = b.getNeighbors([0,0]);

    neighbors[0].should.containDeep([
      [4,4],[0,4],[1,4],
      [4,0]   ,   [1,0],
      [4,1],[0,1],[1,1]
    ]);
  });
});