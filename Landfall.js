var SpaceMiner = SpaceMiner || {};

var asteroid_name = "testeroid";

var defaultAsteroid = {
  gravity: 300,
  name: "testeroid",

  // Resources available for the player to use
  resources: {
    blocks: 0
  },
  terrain: hillAlgorithm(),

  vehicles: [],

  // These don't do anything yet
  orbit_speed: 100,
  radiation: 100
}

var loadedAsteroid = localStorage[asteroid_name] || JSON.stringify(defaultAsteroid);
var asteroid = JSON.parse(loadedAsteroid);

SpaceMiner.Landfall = function() {};
SpaceMiner.Landfall.prototype = {
  create: function() {

    this.asteroid = asteroid;
    this.game.world.setBounds(0,0, 10000, asteroid['terrain'][0].length * 32);
    this.background = this.game.add.tileSprite(0,0, 10000, this.game.world.height, 'space');
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    // Set up terrain
    // this.terrain = asteroid['terrain'];
    this.blocks = this.game.add.group();
    this.setGround();

    // Set up globals
    this.game.physics.arcade.gravity.y = asteroid['gravity'];
    this.asteroid.resources.blocks = asteroid['resources']['blocks'] || 0;
    this.buildings = this.game.add.group();

    Vehicles.setVehicles(this);
    Landfall_setup.setPlayer(this);
    Landfall_setup.setPlayerHalo(this);
    Landfall_setup.setControls(this);
    },

  update: function() {
    this.game.world.bringToTop(this.player);
    this.game.physics.arcade.collide(this.player, this.blocks);
    this.game.physics.arcade.collide(this.vehicles, this.blocks);
    this.movement();


    // Debug.playerAdjacentVehicles(this);
    // Debug.playerAdjacentBlocks(this);

    this.updateLocalStorage();
  },

  movement: Controls.movement,

  mineBlock: Landfall_controls.mineBlock,

  // objectIsOverlapping: Interactions.objectIsOverlapping,

  plopBuilding: function(building) {
    var newBuilding = this.game.add.sprite(this.player.x, this.player.y + 16, building);
    this.game.physics.arcade.enable(newBuilding);
    newBuilding.anchor.set(0.5, 0.5);
    newBuilding.alpha = 0.4;
    this.toPlop = newBuilding;
    this.buildings.add(newBuilding);
    this.plopping = true;
  },

  updateLocalStorage: Landfall_metagame.updateLocalStorage,

  setGround: Landfall_terrain.setGround

} // Landfall

// SpaceMiner.Landfall.setGround = Landfall_helper.setGround;
