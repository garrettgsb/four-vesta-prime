var SpaceMiner = SpaceMiner || {}

SpaceMiner.Game = function() {};

SpaceMiner.Game.prototype = {
  create: function() {
    this.game.world.setBounds(0,0,2048,2048);
    this.background = this.game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
    this.player.scale.setTo(1);
    this.player.anchor.set(0.5);
    this.player.animations.add('fly', [1,2], 2, true);
    this.player.animations.add('float', [0], 20, true);
    this.player.animations.play('fly');
    this.playerScore = 0;
    this.game.physics.p2.enable(this.player, true);
    this.game.physics.p2.setImpactEvents(true);
    this.createCollisionGroups();
    this.game.physics.p2.restitution = 0;
    this.game.physics.p2.updateBoundsCollisionGroup();
    this.playerSpeed = 120;
    this.player.body.setCircle(this.player.width / 2);
    this.player.body.damping = 0.1;
    this.player.body.mass = 10;
    this.player.speed = 0;
    this.player.body.collideWorldBounds = true;
    this.player.body.setCollisionGroup(this.playerCollisions);
    this.player.body.collides([this.collectiblesCollisions, this.asteroidsCollisions]);
    this.game.camera.follow(this.player);
    console.log(this.player.tint);
    this.junkBurned = 0;
    this.generateAsteroids();
    this.generateCollectibles();

    this.explosionSound = this.game.add.audio('explosion');
    this.collectSound = this.game.add.audio('collect');

    this.showLabels();
  },

  update: function() {
    // if (this.game.input.activePointer.isDown) {
    //   this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    // }

    this.controls();
    this.normalize_ship_orientation();

    // Check circle collisions with asteroids
    for (var i = 0; i < this.asteroids.children.length; i++) {
      for (var v = 0; v < this.collectibles.children.length; v++) {
        if (this.circleCollision(this.asteroids.children[i], this.collectibles.children[v]) && !this.collectibles.children[v].burned) {
          // this.junkKill(this.collectibles.children[v]);
          this.junkKill(this.collectibles.children[v]);
          // this.collectibles.children[v].tint = 0xFF0000;
          // this.collectibles.children[v].burned = true;
          // this.junkBurned += 1;
        }
      }
      if (this.circleCollision(this.player, this.asteroids.children[i])) { this.hitAsteroid() };
    }

    this.updateLabels();
    // this.game.physics.arcade.overlap(this.player, this.collectibles, this.collect, null, this);
  },

  circleCollision: function(obj1, obj2) {
    var obj1Radius = Math.max(obj1.width / 2, obj1.height / 2);
    var obj2Radius = Math.max(obj2.width / 2, obj2.height / 2);

    var edgeDistance = obj1Radius + obj2Radius;

    var line = new Phaser.Line(obj1.x,obj1.y, obj2.x,obj2.y);

    return edgeDistance > line.length ? true : false;
  },

  createCollisionGroups: function() {
    this.playerCollisions = this.physics.p2.createCollisionGroup();
    this.asteroidsCollisions = this.physics.p2.createCollisionGroup();
    this.collectiblesCollisions = this.physics.p2.createCollisionGroup();
  },

  collect: function(player, collectible) {
    this.collectSound.play();
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;
    collectible.kill();
  },

  controls: function() {
    var kb = this.input.keyboard;
    if (kb.isDown(Phaser.Keyboard.LEFT) || kb.isDown(Phaser.Keyboard.A)) {
      this.player.body.angle -= 4;
    }

    if (kb.isDown(Phaser.Keyboard.RIGHT) || kb.isDown(Phaser.Keyboard.D)) {
      this.player.body.angle += 4;
    }

    if (kb.isDown(Phaser.Keyboard.UP) || kb.isDown(Phaser.Keyboard.W)) {
      this.player.speed <= 100 ? this.player.speed += 5 : this.player.speed += 0;

    }

    if (kb.isDown(Phaser.Keyboard.DOWN) || kb.isDown(Phaser.Keyboard.S)) {
      if (this.player.speed >= 0) this.player.speed -= 1;
    }

    if (kb.isDown(Phaser.Keyboard.R)) {
      // var orbitable = this.findAllOrbitableBodies();
      // orbitable.forEach(function(e, i){
      //   e['body'].tint = 0xFF0000;
      // });
      var nearest = this.findNearestOrbitableBody();
      nearest['body'].tint = 0xFF0000;
    } else {
      var orbitable = this.findAllOrbitableBodies();
      orbitable.forEach(function(e, i){
        e['body'].tint = 16777215;
      });
    }
  },

  findAllOrbitableBodies: function() {
    var orbitable = [];
    for (var i = 0; i < this.asteroids.length; i++) {
      var line = new Phaser.Line(this.player.x, this.player.y, this.asteroids.children[i].x, this.asteroids.children[i].y);
      var obj = { body: this.asteroids.children[i], distance: line.length }
      orbitable.push(obj);
    }
    return orbitable;
  },

  findNearestOrbitableBody: function() {
    var orbitable = this.findAllOrbitableBodies();
    var nearest;
    var nearestIndex;

    orbitable.forEach(function(e,i) {
      if (nearest > e["distance"] || nearest == undefined) {
        nearest = e["distance"];
        nearestIndex = i;
      }
    })

    return orbitable[nearestIndex];
  },

  gameOver: function() {
    this.game.state.start("MainMenu", true, false, this.playerScore);
  },

  generateAsteroids: function() {
    this.asteroids = this.game.add.group();

    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.P2JS;


    var numAsteroids = this.game.rnd.integerInRange(5, 5);
    var asteroid;
    for (var i = 0; i < numAsteroids; i++) {
      asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
      var scale = this.game.rnd.integerInRange(10,20)/10
      asteroid.scale.setTo(scale);

      asteroid.anchor.set(0.5);
      asteroid.body.velocity.x = this.game.rnd.integerInRange(-10, 10);
      asteroid.body.velocity.y = this.game.rnd.integerInRange(-10, 10);
      // asteroid.body.immovable = true;
      asteroid.body.collideWorldBounds = true;
      asteroid.body.mass = asteroid.width * 10;
      asteroid.body.setCircle(asteroid.width / 2);
      asteroid.body.setCollisionGroup(this.asteroidsCollisions);
      asteroid.body.collides([this.playerCollisions, this.collectiblesCollisions, this.asteroidsCollisions])
    }

  },

  generateCollectibles: function() {
    this.collectibles = this.game.add.group();
    this.collectibles.enableBody = true;
    this.collectibles.physicsBodyType = Phaser.Physics.P2JS;

    var numCollectibles = this.game.rnd.integerInRange(100,150);
    var collectible;

    for (var i = 0; i < numCollectibles; i++) {
      collectible = this.collectibles.create(this.game.world.randomX, this.game.world.randomY, "power");
      collectible.body.setCircle(collectible.width / 2);
      this.physics.p2.enable(collectible, true);
      collectible.animations.add('fly', [0,1,2,3], 5, true);
      collectible.animations.play('fly');
      collectible.body.mass = 1;
      collectible.body.setCollisionGroup(this.collectiblesCollisions);
      collectible.body.collides([this.playerCollisions, this.asteroidsCollisions, this.collectiblesCollisions]);
      // collectible.body.onBeginContact.add(this.junkKill, collectible);
    }
  },

  hitAsteroid: function() {
    // this.explosionSound.play();
    var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
    emitter.makeParticles('playerParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(600, 600);
    emitter.gravity = 0;
    emitter.start(true, 600, null, 10);
    // this.game.time.events.add(1200, this.gameOver, this);
  },

  junkKill: function(junk) {
    // console.log("Collision");
    junk.tint = 0xFF0000;
    junk.burned = true;
    this.junkBurned += 1;

    var junkEmitter = this.game.add.emitter(junk.x, junk.y, 100);
    junkEmitter.makeParticles('junkParticle');
    junkEmitter.minParticleSpeed.setTo(-200, -200);
    junkEmitter.maxParticleSpeed.setTo(600, 600);
    junkEmitter.gravity = 0;
    junkEmitter.start(true, 400, null, 10);
    junk.kill();
  },

  normalize_ship_orientation: function() {
    this.player.body.angularVelocity = 0;
    this.player.body.moveForward(this.player.speed);
    this.player.speed > 0 ? this.player.animations.play('fly') : this.player.animations.play('float');
  },

  showLabels: function() {
    var text = "0";
    var junkLeft = this.collectibles.children.length;
    var style = { font: "15px Arial", fill: "#fff", align: "center" }
    this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height - 50, text, style);
    this.scoreLabel.fixedToCamera = true;
    this.junkLabel = this.game.add.text(this.game.width-50, this.game.height - 100, junkLeft, style);
    this.junkLabel.fixedToCamera = true;
  },

  updateLabels: function() {
    this.playerScore = this.junkBurned;
    var text = this.playerScore;
    var junkLeft = this.collectibles.children.length - this.junkBurned;
    var style = { font: "15px Arial", fill: "#fff", align: "center" }
    this.scoreLabel.destroy();
    this.junkLabel.destroy();
    this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height - 50, text, style);
    this.scoreLabel.fixedToCamera = true;
    this.junkLabel = this.game.add.text(this.game.width-50, this.game.height - 100, junkLeft, style);
    this.junkLabel.fixedToCamera = true;
  }
}
