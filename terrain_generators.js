function skylineAlgorithm() {
  var terrain = [];
  var length = 100;
  var depth = 10;
  var column = [];

  for (var i = 0; i < length; i++) {
    for (var e = 0; e < depth; e++) {
      if (column.length > 0) {
        if (column[column.length - e] == 1) {
          var dice = Math.random();
          dice > 0.3 ? column.unshift(1) : column.unshift(0)
        } else {
          column.unshift(0);
        }
      } else {
        column.unshift(1);
      }
    }
    terrain.push(column);
    column = [];
  }

  return terrain;
};

function sawAlgorithm() {
  var terrain = [];
  var length = 100;
  var depth = 30;
  var column = [];
  var density = 0.01;

  // Initial pass to fill level 1 with blocks
  for (var i = 0; i < length; i++) {
    terrain.push([1]);
  }

  for (var i = 0; i < depth; i++) {
    for (var e = 0; e < length; e++) {
      var iHas = false;
      var leftHas = false;
      var rightHas = false;

      // if (i == 1) {
      //   iHas = true;
      //   leftHas = true;
      //   rightHas = true;
      // }

      column = terrain[e];
      if (terrain[e][0] == 1) { iHas = true }
      if (terrain[e - 1] && terrain[e - 1][1] == 1) { leftHas = true }
      if (terrain[e + 1] && terrain[e + 1][0] == 1) { rightHas = true }

      var dice = Math.random();
      if (iHas && leftHas && rightHas) {
        dice > density * 4 ? terrain[e].unshift(1) : terrain[e].unshift(0);
      } else if (iHas && leftHas) {
        dice  > density * 2 ? terrain[e].unshift(1) : terrain[e].unshift(0);
      // } else if (iHas && rightHas) {
      //   dice > density ? terrain[e].unshift(1) : terrain[e].unshift(0);
      // } else if (iHas) {
      //   dice > density ? terrain[e].unshift(1) : terrain[e].unshift(0);
      } else { terrain[e].unshift(0) }
    }
  }

  return terrain;
}

function hillAlgorithm() {
  var terrain = [];
  var length = 100;
  var depth = 30;
  var column = [];
  var density = 0.6;

  for (var i = 0; i < length; i++) {
    terrain.push([1]);
  }

  for (var i = 0; i < depth; i++) {
    for (var e = 0; e < terrain.length; e++) {
      var dice = Math.random();

      // Randomly add 1's to current cell
      if (dice > density) { terrain[e].push(1) }
      if (terrain[e-1] && terrain[e-1].length < terrain[e].length) {
        var dice = Math.random();
        if (dice > density) { terrain[e-1].push(1) };
      }
      if (terrain[e+1] && terrain[e+1].length < terrain[e].length) {
        var dice = Math.random();
        if (dice > density) { terrain[e+1].push(1) };
      }
    }
  }

  for (var i = 0; i < length; i++) {
    console.log(terrain[i].length);
    while (terrain[i].length < depth) {
      terrain[i].unshift(0);
    }
  }
  return terrain
}
