
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

