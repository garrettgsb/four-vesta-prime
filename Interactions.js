var Interactions = {

  findBoardableVehicle: function(state) {
    for (var i = 0; i < state.vehicles.length; i++) {
      if (state.player !== state.vehicles[i]) {
        if (Interactions.playerIsFacing(state.vehicles[i], state)) { return state.vehicles[i] }
      }
    }
  },

  objectIsOverlapping: function(first, second, state) {
    var bounds1 = first.getBounds()
    var bounds2 = second.getBounds();
    var answer = Phaser.Rectangle.intersects(bounds1, second.getBounds());
    return answer;
  },

  playerIsAdjacent: function(thing, state) {
    if (thing === state.player) { return false };
    return this.objectIsOverlapping(state.haloL, thing, state) ||
      this.objectIsOverlapping(state.haloR, thing, state) ||
      this.objectIsOverlapping(state.haloU, thing, state) ||
      this.objectIsOverlapping(state.haloD, thing, state);
  },

  playerIsFacing: function(thing, state) {
    return this.objectIsOverlapping(state.haloR, thing, state);
  }
}
