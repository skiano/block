
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
    
    b.get([0,3]).should.eql([0,0]);
    b.get([0,4]).should.eql([0,1]);
    b.get([-4,4]).should.eql([2,1]);
    b.get([-4,-8]).should.eql([2,1]);
    
  });

});