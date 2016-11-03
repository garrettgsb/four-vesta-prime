var Vehicles = {

  findPlayerVehicleIndex: function(state) {
    for (var i = 0; i < state.vehicles.length; i++) {
      if (state.player === state.vehicles[i]) { return i }
    }
  },

  setVehicles: function(state) {
    state.vehicles = [];

    if (state.asteroid.vehicles.length > 0) {
      state.asteroid.vehicles.forEach(function(v) {
        console.log(v.vehicleType);
        var vehicle = Vehicles[v.vehicleType].createSprite(v.x, v.y, state);
        if (vehicle.vehicleType == state.asteroid.active) { Vehicles.setActiveVehicle(vehicle, state); }
      })
    } else {
      var miner = Vehicles.Miner.createSprite(20, 200, state);
      this.setActiveVehicle(state.vehicles[0], state);
      // console.log(state.vehicles[0]);
    }
  },

  setActiveVehicle: function(vehicle, state) {
    // console.log(vehicle);
    state.player = vehicle;
    state.asteroid.active = vehicle.vehicleType;
  },

  board: function(vehicle, state) {
    // Get Miner from vehicle pool
    var dude = Vehicles.findPlayerVehicleIndex(state);
    state.vehicles[dude].destroy();
    state.vehicles.splice(dude, 1);
    state.haloL.destroy();
    state.haloR.destroy();
    state.haloU.destroy();
    state.haloD.destroy();

    state.player = vehicle;
    state.asteroid.active = vehicle.vehicleType;
    Landfall_setup.setPlayer(state);
    Landfall_setup.setPlayerHalo(state);

  },

  disembark: function(state) {
    state.haloL.destroy();
    state.haloR.destroy();
    state.haloU.destroy();
    state.haloD.destroy();


    var miner = Vehicles.Miner.createSprite(state.player.x, state.player.y, state);
    state.player = miner;
    state.asteroid.active = miner.vehicleType;
    Landfall_setup.setPlayer(state);
    Landfall_setup.setPlayerHalo(state);
  },

  // updateVehicles: function(vehicles, state) {
  //   vehicles.forEach(function(v) {
  //
  //   });
  // },

  Miner: {
    createSprite: function(x, y, state) {
      console.log("Creating Miner");
      var EVA = state.game.add.sprite(x, y, 'Miner');
      EVA.vehicleType = "Miner"; // This should correspond to sprite name.
      EVA.anchor.set(0.5,0.5);
      EVA.animations.add('idle', [0], 10, true);
      EVA.animations.add('run', [1,2,1,3], 3, true);
      EVA.animations.add('fly', [4,5], 5, true);
      state.game.physics.arcade.enable(EVA, true);
      EVA.body.enable = true;
      EVA.meta = {
        x: EVA.x,
        y: EVA.y,
        vehicleType: 'Miner'
      }

      console.log(state.vehicles);
      console.log("...");
      state.vehicles.push(EVA);
      console.log(state.vehicles);
      return EVA;
    },

    properties: {
      maxSpeed: 80,
      accel: 8,
      lift: 8
    }

  },

  Rover: {
    createSprite: function(x, y, state) {
      var Rover = state.game.add.sprite(x, y, 'Rover');
      Rover.vehicleType = "Rover";
      Rover.anchor.set(0.5,0.5);
      Rover.animations.add('idle', [0], 10, true);
      Rover.animations.add('liftoff', [0,1,2,3,4,5,4,5,4,5,4,5,4,3,2,1,0], 5, true);
      Rover.animations.add('fly', [4,5], 5, true);
      state.game.physics.arcade.enable(Rover, true);
      Rover.body.enable = true;
      state.vehicles.push(Rover);
      return Rover;
    },

    properties: {
      maxSpeed: 80,
      accel: 8,
      lift: 8
    }
  }
}
