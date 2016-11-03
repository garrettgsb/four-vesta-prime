var SpaceMiner = SpaceMiner || {}

SpaceMiner.Preload = function() {}

SpaceMiner.Preload.prototype = {
  preload: function() {
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    // This is where all of the assets will be loaded in.
    // this.load.image('space', 'assets/images/space.png');
    this.load.image('space', 'assets/images/space.png');
    this.load.image('rock', 'assets/images/asteroid-128.png');
    this.load.spritesheet('playership', 'assets/images/miner-ship-mk1.png', 32, 32);
    this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
    this.load.image('playerParticle', 'assets/images/player-particle.png');
    this.load.image('junkParticle', 'assets/images/junk-particle.png');
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');

    this.load.spritesheet('terrain_rock', 'assets/images/terrain-rock-32.png', 32, 32);
    this.load.spritesheet('Rover', 'assets/images/rover-32.png', 32, 32);
    this.load.spritesheet('Miner', 'assets/images/miner-16.png', 8, 16);

    this.load.image('rover-halo-v', 'assets/images/rover-halo-48-v.png', 48, 1)
    this.load.image('rover-halo-l', 'assets/images/rover-halo-24-l.png', 1, 24)
    this.load.image('rover-halo-r', 'assets/images/rover-halo-24-r.png', 1, 24)
    this.load.image('rover-halo-u', 'assets/images/rover-halo-24-u.png', 24, 1)
    this.load.image('rover-halo-d', 'assets/images/rover-halo-24-d.png', 24, 1)
    this.load.image('outpost', 'assets/images/base-doodle-02.png')
    this.load.spritesheet('construction-module', 'assets/images/construction-module-16.png', 16, 16);
    this.load.spritesheet('crate', 'assets/images/crate-16.png', 16, 16);
    this.load.spritesheet('loose-ore', 'assets/images/loose-ore-16.png', 16, 16)
  },

  create: function() {
    this.state.start("MainMenu");
  }
}
