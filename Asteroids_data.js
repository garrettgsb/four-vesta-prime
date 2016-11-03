var SpaceMiner = SpaceMiner || {}

var asteroid = {
  terrain: [[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,1,1],[0,1,1],[0,0,1],[0,0,1],[0,0,1],[0,1,1],[1,1,1],[1,1,1],[0,1,1],[0,0,1],[1,0,1],[1,0,1],[1,0,0],[0,1,0],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]]
}

asteroid['terrain'] = [];
asteroid['terrain'] = hillAlgorithm();

var asteroids = []

var asteroid = {
  name: "project_procedural",

  terrain: hillAlgorithm(),

  gravity: 300,

  // These don't do anything yet
  radiation: 100,
  orbit_speed: 100

}
