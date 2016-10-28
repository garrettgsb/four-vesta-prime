var SpaceMiner = SpaceMiner || {};

SpaceMiner.Boot = function() {};

SpaceMiner.Boot.prototype = {
  preload: function() {
    // Assets used in loading screen
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },

  create: function() {
    // Loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    // Scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 240;
    this.scale.minHeight = 170;
    this.scale.maxWidth = 2880;
    this.scale.maxHeight = 1920;

    this.scale.pageAlignHorizontally = true;

    //TODO: Figure out how to fix this...?
    // this.scale.setScreenSize(true); // Screen size set automatically


    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.state.start('Preload');
  }
}
