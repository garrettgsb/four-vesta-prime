
var Debug = {
  playerAdjacentBlocks: function(state) {
    if (state.player) {
      var counter = state.blocks.children.length;
      for (var i = 0; i < counter; i++) {
        if (Interactions.playerIsAdjacent(state.blocks.children[i], state)) {
          state.blocks.children[i].tint = 0xFF88AA;
        } else { state.blocks.children[i].tint = 0xFFFFFF }
      }
    }
  }, // playerAdjacencies

  playerAdjacentVehicles: function(state) {
    if (state.player) {
      var counter = state.vehicles.length;
      for (var i = 0; i < counter; i++) {
        if (Interactions.playerIsAdjacent(state.vehicles[i], state)) {
          state.vehicles[i].tint = 0xFF88AA;
        } else { state.vehicles[i].tint = 0xFFFFFF }
      }
    }
  }, // playerAdjacencies

  listVehicles: function(state) {
    state.vehicles.forEach(function(v){
      console.log(v.vehicleType);
      console.log(".");
    })
  },

  utilityKey: function(state) {
    var utilityKey = state.input.keyboard.addKey(Phaser.Keyboard.T)
      utilityKey.onUp.add(function() {
      Vehicles.Rover.createSprite(state.game.input.x, state.game.input.y, state);
    }, state);
  },

  infoKey: function(state) {
    var infoKey = state.input.keyboard.addKey(Phaser.Keyboard.P);
    infoKey.onUp.add(function() {
      Debug.listVehicles(state);
    }, state);

    var infoKeyTwo = state.input.keyboard.addKey(Phaser.Keyboard.O);
    infoKeyTwo.onUp.add(function() {
      console.log(state.player);
      console.log(state.player.vehicleType);
    }, state);
  }
}
