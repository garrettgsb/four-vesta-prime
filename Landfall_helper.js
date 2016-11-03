// SETUP FUNCTIONS
//----------------
var Landfall_setup = {

  setPlayer: function(state) {
    state.player.anchor.set(0.5,0.5);
    state.player.animations.play('idle');
    state.game.physics.arcade.enable(state.player, true);
    state.player.body.enable = true;
    state.game.physics.arcade.enable(state.player, true);
    state.game.camera.follow(state.player);
  },

  setPlayerHalo: function(state) {
    state.haloL = state.game.add.sprite(-8, 0, 'rover-halo-l')
    state.haloR = state.game.add.sprite(8, 0, 'rover-halo-r')
    state.haloU = state.game.add.sprite(0, -8, 'rover-halo-u')
    state.haloD = state.game.add.sprite(0, 8, 'rover-halo-d')

    state.haloL.anchor.set(0.5,0.5)
    state.haloR.anchor.set(0.5,0.5)
    state.haloU.anchor.set(0.5,0.5)
    state.haloD.anchor.set(0.5,0.5)

    state.player.addChild(state.haloL);
    state.player.addChild(state.haloR);
    state.player.addChild(state.haloU);
    state.player.addChild(state.haloD);
  },

  setControls: function(state) {
    Controls.toggleVehicle(state);
    Debug.utilityKey(state);
    Debug.infoKey(state);
  }
}


// TERRAIN FUNCTIONS
//----------------
var Landfall_terrain = {
  setGround: function() {
    var state = this;
    var terrain = asteroid['terrain']
    var leftmost = Math.floor(terrain.length / 2);
    var startX = 128;
    var startY = 50;
    var step = 32
    var terrain_width = 64;

    for (var r = 0; r < terrain.length; r++) {
      for (var c = 0; c < terrain[r].length; c++) {
        if (typeof(terrain[r][c] == 'number')) {
          if (terrain[r][c] == 1) {
            var block = this.game.add.sprite(startX + r * step, startY + c * step, 'terrain_rock');
            block.blockID = [r, c];
            block.blockMaterial = terrain[r][c];
            block.frame = this.game.rnd.integerInRange(0, 3);
            this.game.physics.arcade.enable(block);
            block.body.allowGravity = false;
            block.body.immovable = true;
            this.blocks.add(block);
          }
      }

      if (typeof(terrain[r][c]) == 'object') {
          if (terrain[r][c]['material'] || terrain[r][c]['material'] == "clay") {
            Objects.looseOre.createSprite(startX + 16 + r * step, startY + 16 + c * step, "clay", state);
          }
        }
      }
    } // for loop
  } // setGround
}


// CONTROLS FUNCTIONS
//-------------------
var Landfall_controls = {
  mineBlock: function(direction) {
    var state = this;
    var bounds;
    var block;

    if (direction == "side") { bounds = this.haloR.getBounds(); }
    if (direction == "up") { bounds = this.haloU.getBounds(); }
    if (direction == "down") { bounds = this.haloD.getBounds(); }

    this.blocks.children.forEach(function(e,i){
      block = e;
      var blockBounds = e.getBounds();
        if (Phaser.Rectangle.intersects(bounds, blockBounds)) {
          e.alpha -= 0.1;
      if (e.alpha < 0.2) {

        this.asteroid.resources.blocks += 1;
        this.changed = true;
        var debris = Objects.looseOre.createSprite(e.centerX, e.centerY, "clay", state);
        this.asteroid.terrain[block.blockID[0]][block.blockID[1]] = debris.meta;
        e.destroy() };
      }
    });
  },

}

// META-GAME FUNCTIONS
//--------------------
var Landfall_metagame = {
  updateLocalStorage: function() {
    this.asteroid.vehicles = [];
    this.vehicles.forEach(function(v) {
      this.asteroid.vehicles.push({
        x: v.x,
        y: v.y,
        vehicleType: v.vehicleType
      });
    });

    this.asteroid.active = this.player.vehicleType;

    // I THINK I can delete this without penalty.
    this.asteroid.playerPos = [this.player.x, this.player.y];
    localStorage[this.asteroid.name] = JSON.stringify(this.asteroid);
  }
}
