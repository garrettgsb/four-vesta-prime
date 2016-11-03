var Objects = {

  looseOre: {
    createSprite: function(x, y, material, state) {
      var newOre = state.game.add.sprite(x, y, 'loose-ore');
      newOre.objType = "looseOre";
      newOre.anchor.set(0.5,0.5);
      newOre.animations.add('settled', [0], 10, true);
      newOre.animations.add('floating', [1,2,3,2,1], 5, true);
      newOre.animations.play('floating');
      newOre.floating = true;
      newOre.material = material;
      newOre.meta = {
        x: newOre.x,
        y: newOre.y,
        material: newOre.material
      }
      return newOre;
    },

    settle: function(body) {
      newOre.floating = false;
      newOre.animations.play('settled');
    },

    update: function(body) {
      if (body.floating = 'true') { body.animations.play('floating') };
      if (body.floating = 'false') { body.animations.play('settled') };
    }
  },

  constructionModule: {
    createSprite: function(x, y, building) {
      var cModule = this.game.add.sprite(x, y, 'rover');
      cModule.objType = "constructionModule";
      cModule.anchor.set(0.5,0.5);
      cModule.animations.add('active', [0,1], 10, true);
      cModule.animations.add('ready', [1], 5, true);
      cModule.animations.add('standby', [2], 10, true);
      cModule.animations.play('floating');
      cModule.activity = 'ready';
      cModule.animations.play('ready');
      return cModule;
    },

    update: function(body) {
      if (body.activity = 'ready') { body.animations.play('ready') };
      if (body.activity = 'active') { body.animations.play('active') };
      if (body.activity = 'standby') { body.animations.play('standby') };
    }
  }
}
