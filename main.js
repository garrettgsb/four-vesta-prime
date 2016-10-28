var SpaceMiner = SpaceMiner || {};

SpaceMiner.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "");
SpaceMiner.game.state.add("Boot", SpaceMiner.Boot);
SpaceMiner.game.state.add("Preload", SpaceMiner.Preload);
SpaceMiner.game.state.add("MainMenu", SpaceMiner.MainMenu);
SpaceMiner.game.state.add("Game", SpaceMiner.Game);
SpaceMiner.game.state.add("Landfall", SpaceMiner.Landfall);
SpaceMiner.game.state.start("Boot");
