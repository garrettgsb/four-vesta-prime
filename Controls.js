var Controls = {
  movement: function() {
    var kb = this.input.keyboard;
    if (kb.isDown(Phaser.Keyboard.LEFT) || kb.isDown(Phaser.Keyboard.A)) {
      this.player.scale.x = -1;
      this.player.body.velocity.x -= 10;
      this.player.animations.play('run');
      if (kb.isDown(Phaser.Keyboard.M)) { this.mineBlock("side") };
    }

    if (kb.isDown(Phaser.Keyboard.RIGHT) || kb.isDown(Phaser.Keyboard.D)) {
      this.player.scale.x = 1
      this.player.body.velocity.x += 10;
      this.player.animations.play('run');

      if (kb.isDown(Phaser.Keyboard.M)) { this.mineBlock("side") };
    }

    if (kb.isDown(Phaser.Keyboard.UP) || kb.isDown(Phaser.Keyboard.W)) {
      if (kb.isDown(Phaser.Keyboard.M)) {
        this.mineBlock("up");
      } else {
        this.player.body.velocity.y = -100;
        this.player.animations.play('fly');
      }
    }

    if (kb.isDown(Phaser.Keyboard.DOWN) || kb.isDown(Phaser.Keyboard.S)) {
      if (this.player.body.velocity.x != 0) {
        this.player.body.velocity.x > 0 ? this.player.body.velocity.x -= 20 : this.player.body.velocity.x += 20 };
        if (this.player.body.velocity.x < 20 && this.player.body.velocity.x > -20) { this.player.body.velocity.x = 0; }

      if (kb.isDown(Phaser.Keyboard.M)) { this.mineBlock("down") };
    }

    if ((this.player.body.velocity.x < 10 && this.player.body.velocity.x > -10) && this.player.body.velocity.y < 50) { this.player.animations.play('idle'); }
  },

  toggleVehicle: function(state) {
    var changeVehicle = state.input.keyboard.addKey(Phaser.Keyboard.F);
    changeVehicle.onUp.add(function() {
      /*
      If the player is without a vehicle (i.e. his/her "vehicle" is just the
      Miner), then the Miner will disappear on boarding, because they're in
      the vehicle now.
      */
        if (state.player.vehicleType == "Miner") {
          console.log("Embarking");
          var newVehicle = Interactions.findBoardableVehicle(state);
          Vehicles.board(newVehicle, state);
        } else {
          console.log("Disembarking");
          Vehicles.disembark(state)
        }
    }, state);
  }
}
