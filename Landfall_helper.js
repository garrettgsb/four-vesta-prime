var Landfall_terrain = {
  setGround: function() {
    // console.log(asteroid);
    var terrain = asteroid['terrain']
    var leftmost = Math.floor(terrain.length / 2);
    var startX = 128;
    var startY = 50;
    var step = 32
    var terrain_width = 64;

    for (var r = 0; r < terrain.length; r++) {
      console.log(terrain[r]);
      for (var c = 0; c < terrain[r].length; c++) {
        if (terrain[r][c] == 1) {
          var block = this.game.add.sprite(startX + r * step, startY + c * step, 'terrain_rock');
          block.frame = this.getRandomTile();
          this.game.physics.arcade.enable(block);
          block.body.allowGravity = false;
          block.body.immovable = true;
          this.blocks.add(block);
        }
      }
    } // for loop
  } // setGround
}

var Landfall_controls = {
  controls: function() {
    var kb = this.input.keyboard;
    if (kb.isDown(Phaser.Keyboard.LEFT) || kb.isDown(Phaser.Keyboard.A)) {
      this.player.scale.x = -1;
      this.player.body.velocity.x -= 10;

      if (kb.isDown(Phaser.Keyboard.M)) { this.mineBlock("side") };
    }

    if (kb.isDown(Phaser.Keyboard.RIGHT) || kb.isDown(Phaser.Keyboard.D)) {
      this.player.scale.x = 1
      this.player.body.velocity.x += 10;

      if (kb.isDown(Phaser.Keyboard.M)) { this.mineBlock("side") };
    }

    if (kb.isDown(Phaser.Keyboard.UP) || kb.isDown(Phaser.Keyboard.W)) {
      if (kb.isDown(Phaser.Keyboard.M)) {
        this.mineBlock("up");
      } else {
        this.player.body.velocity.y = -100;
        this.player.animations.play('fly');
      }
    } else { this.player.animations.play('idle'); }

    if (kb.isDown(Phaser.Keyboard.DOWN) || kb.isDown(Phaser.Keyboard.S)) {
      if (this.player.body.velocity.x != 0) {
        this.player.body.velocity.x > 0 ? this.player.body.velocity.x -= 20 : this.player.body.velocity.x += 20 };

      if (kb.isDown(Phaser.Keyboard.M)) { this.mineBlock("down") };


    }

    if (kb.isDown(Phaser.Keyboard.R)) {
      // if (this.plopping == false) {   this.plopBuilding('outpost'); }
      this.plopBuilding('outpost');
      console.log(this.toPlop);
      // console.log(this.player.body.touching.bottom);
    }
  },

  mineBlock: function(direction) {
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
      if (e.alpha < 0.2) { e.destroy() };
      }
    });
  }
}
