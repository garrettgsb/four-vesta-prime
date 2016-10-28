SpaceMiner.MainMenu = function(){};

SpaceMiner.MainMenu.prototype = {
  create: function() {

    // "space" tile shown, repeated
    this.background = this.game.add.tileSprite(0,0, this.game.width, this.game.height, 'space');
    this.background.autoScroll(-20, 0);

    var text = "Tap to begin";
    var style = { font: "15px Arial", fill: "#fff", align: "center" };
    var h = this.game.add.text(
              this.game.width / 2,
              this.game.height/2 + 50,
              text,
              style
            );
    h.anchor.set(0.5);

    text = `Highest score: ${this.highestScore || 0}`;
    var t = this.game.add.text(
      this.game.width /2,
      this.game.height / 2 + 150,
      text,
      style
    );
    t.anchor.set(0.5);
  },

  init: function(score) {
    var score = score || 0;
    this.highestScore = localStorage['highestScore'] || 0;
    this.highestScore = Math.max(score, this.highestScore);
    localStorage.setItem('highestScore',this.highestScore);
  },

  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start("Landfall");
    }
  }
};
