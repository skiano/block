
## Skiano Block

A utility for describing positions in terms of a pattern block. You configure the size and settings of the pattern block and then ask for 'absolute' positions to be converted to positions on the pattern block.

_So far only integer positions are fully tested_

#### Installation

```shell
$ npm install skiano.block
```

#### Basic Usage

```javascript
var block = require('skiano.block');
 
var width = 100,
  height = 100,
  b = block([width, height]);
  
var point = b.get(50,50); // returns [50,50]
var point = b.get(-1,-1); // returns [99,99]
```

#### Configuring Step Patterns

Steps allow for patterns that shift on the `x` or `y` axis. Sometimes reffered to as a drop. 

```javascript
var b = block([4,4], {
  step: 1,
  direction: 'y' // 'x' or 'y'
});

var p = b.get(6,4); // returns [2,3]
```
_Illustration of how p works with a simple step_
```
  0 1 2 3 4 5 6 7
0 - - - -
1 - - - - ~ ~ ~ ~
2 - - - - ~ ~ ~ ~
3 - - - - ~ ~ ~ ~
4         ~ ~ p ~  <-- point lands on a shifted block
```

_Illustration of step options_
```
Step 2 on the X axis    Step -2 on the Y axis (0r +1)

~ ~ ~ ~ ~ ~ ~ ~ ~ ~     ~ ~ |   |   |
|     |     |     |     |   ~ ~ ~   |
~ ~ ~ ~ ~ ~ ~ ~ ~ ~     |   |   ~ ~ ~
    |     |     |       ~ ~ ~   |   |
~ ~ ~ ~ ~ ~ ~ ~ ~ ~     |   ~ ~ ~   |
  |     |     |         |   |   ~ ~ ~
~ ~ ~ ~ ~ ~ ~ ~ ~ ~     ~ ~ ~   |   |
```
### Getting Neighbor points

You can ask for the points surrounding a given point like so

```javascript
var b = block([5,5]),
  levels = 2; // default is 1

var n = b.getNeighbors([2,2], levels); // returns 'levels' array
// n[0] corresponds to first ring around point
// n[1] corresponds to the ring of points around n[0]
```

_illustration of 'levels' array
```
Point [2,2] -> n[0] of point -> n[1] of point
. . . . .      . . . . .        x x x x x
. . . . .      . x x x .        x . . . x
. . x . .      . x . x .        x . . . x
. . . . .      . x x x .        x . . . x
. . . . .      . . . . .        x x x x x
```

