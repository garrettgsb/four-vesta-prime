var SpaceMiner = SpaceMiner || {}

var asteroid = {
  terrain: [[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,1,1],[0,1,1],[0,0,1],[0,0,1],[0,0,1],[0,1,1],[1,1,1],[1,1,1],[0,1,1],[0,0,1],[1,0,1],[1,0,1],[1,0,0],[0,1,0],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]]
}

asteroid['terrain'] = [];
asteroid['terrain'] = hillAlgorithm();

SpaceMiner.Landfall = function() {};
SpaceMiner.Landfall.prototype = {
  create: function() {
    this.game.world.setBounds(0,0, 10000, asteroid['terrain'][0].length * 32);
    this.background = this.game.add.tileSprite(0,0, 10000, this.game.world.height, 'space');
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.player = this.game.add.sprite(200, 20, 'rover');
    this.player.anchor.set(0.5,0.5);
    this.player.animations.add('idle', [0], 10, true);
    this.player.animations.play('idle');
    this.player.animations.add('liftoff', [0,1,2,3,4,5,4,5,4,5,4,5,4,3,2,1,0], 5, true);
    this.player.animations.add('fly', [4,5], 5, true);
    this.player.animations.play('idle');
    this.game.physics.arcade.enable(this.player, true);
    this.player.body.enable = true;
    this.game.physics.arcade.gravity.y = 300;
    this.game.camera.follow(this.player);


    this.blocks = this.game.add.group();
    this.setGround();

    this.buildings = this.game.add.group();

    this.haloL = this.game.add.sprite(-8, 0, 'rover-halo-l')
    this.haloR = this.game.add.sprite(8, 0, 'rover-halo-r')
    this.haloU = this.game.add.sprite(0, -8, 'rover-halo-u')
    this.haloD = this.game.add.sprite(0, 8, 'rover-halo-d')

    this.haloL.anchor.set(0.5,0.5)
    this.haloR.anchor.set(0.5,0.5)
    this.haloU.anchor.set(0.5,0.5)
    this.haloD.anchor.set(0.5,0.5)

    this.player.addChild(this.haloL);
    this.player.addChild(this.haloR);
    this.player.addChild(this.haloU);
    this.player.addChild(this.haloD);
    },

  update: function() {
    // this.player.body.velocity.y = 0;
    this.game.physics.arcade.collide(this.player, this.blocks)
    this.controls();
    if (this.toPlop) {
      this.toPlop.x = this.game.input.x;
      this.toPlop.y = this.game.input.y;
    }
  },

  controls: Landfall_controls.controls,

  getRandomTile: function() {
    return this.game.rnd.integerInRange(0, 3);
  },

  mineBlock: Landfall_controls.mineBlock,

  plopBuilding: function(building) {
    var newBuilding = this.game.add.sprite(this.player.x, this.player.y + 16, building);
    this.game.physics.arcade.enable(newBuilding);
    newBuilding.anchor.set(0.5, 0.5);
    newBuilding.alpha = 0.4;
    this.toPlop = newBuilding;
    this.buildings.add(newBuilding);
    this.plopping = true;
  },

  setGround: Landfall_terrain.setGround

} // Landfall

// SpaceMiner.Landfall.setGround = Landfall_helper.setGround;
