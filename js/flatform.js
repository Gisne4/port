const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1200 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

let hero,
  platforms,
  coins,
  spiders,
  key,
  door,
  cursors,
  sfx,
  coinPickupCount = 0,
  hasKey = false;

function preload() {
  this.load.image("background", "images/background.png");
  this.load.image("ground", "images/ground.png");
  this.load.image("ground", "images/ground.png");
  this.load.image("grass:8x1", "images/grass_8x1.png");
  this.load.image("grass:6x1", "images/grass_6x1.png");
  this.load.image("grass:4x1", "images/grass_4x1.png");
  this.load.image("grass:2x1", "images/grass_2x1.png");
  this.load.image("grass:1x1", "images/grass_1x1.png");
  this.load.image("key", "images/key.png");
  this.load.image("door", "images/door.png");
  this.load.spritesheet("hero", "images/hero.png", {
    frameWidth: 36,
    frameHeight: 42,
  });
  this.load.spritesheet("coin", "images/coin_animated.png", {
    frameWidth: 22,
    frameHeight: 22,
  });
  this.load.spritesheet("spider", "images/spider.png", {
    frameWidth: 42,
    frameHeight: 32,
  });
  this.load.audio("sfx:jump", "audio/jump.wav");
  this.load.audio("sfx:coin", "audio/coin.wav");
  this.load.audio("sfx:key", "audio/key.wav");
  this.load.audio("sfx:door", "audio/door.wav");
  this.load.audio("sfx:stomp", "audio/stomp.wav");
  this.load.json("levelData", "data/level01.json");
}

function create() {
  this.input.on("wheel", (pointer, deltaX, deltaY) => {
    // Do nothing in Phaser, let the browser scroll
  });
  this.add.image(0, 0, "background").setOrigin(0, 0);
  let levelData = this.cache.json.get("levelData");

  platforms = this.physics.add.staticGroup();
  levelData.platforms.forEach((data) => {
    platforms.create(data.x, data.y, data.image);
  });

  hero = this.physics.add.sprite(levelData.hero.x, levelData.hero.y, "hero");
  hero.setCollideWorldBounds(true);

  key = this.physics.add.sprite(levelData.key.x, levelData.key.y, "key");
  key.setCollideWorldBounds(true);
  key.setBounce(0.3);

  door = this.physics.add.sprite(levelData.door.x, levelData.door.y, "door");
  door.setCollideWorldBounds(true);

  coins = this.physics.add.group();
  levelData.coins.forEach((data) => {
    let coin = coins.create(data.x, data.y, "coin");
    coin.setCollideWorldBounds(true);
    coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  spiders = this.physics.add.group();
  levelData.spiders.forEach((data) => {
    let spider = spiders.create(data.x, data.y, "spider");
    spider.setCollideWorldBounds(true);
    spider.setVelocityX(100);
    spider.setBounceX(1);
  });

  this.physics.add.collider(hero, platforms);
  this.physics.add.collider(spiders, platforms);
  this.physics.add.collider(coins, platforms);
  this.physics.add.collider(key, platforms);
  this.physics.add.overlap(hero, coins, collectCoin, null, this);
  this.physics.add.overlap(hero, key, collectKey, null, this);
  this.physics.add.overlap(hero, door, enterDoor, null, this);
  this.physics.add.overlap(hero, spiders, onHeroVsEnemy, null, this);

  cursors = this.input.keyboard.createCursorKeys();
  sfx = {
    jump: this.sound.add("sfx:jump"),
    coin: this.sound.add("sfx:coin"),
    key: this.sound.add("sfx:key"),
    door: this.sound.add("sfx:door"),
    stomp: this.sound.add("sfx:stomp"),
  };
}

function update() {
  if (cursors.left.isDown) {
    hero.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    hero.setVelocityX(160);
  } else {
    hero.setVelocityX(0);
  }

  if (cursors.up.isDown && hero.body.touching.down) {
    hero.setVelocityY(-600);
    sfx.jump.play();
  }
}

function collectCoin(hero, coin) {
  coin.disableBody(true, true);
  coinPickupCount++;
  sfx.coin.play();
}

function collectKey(hero, key) {
  key.disableBody(true, true);
  hasKey = true;
  sfx.key.play();
}

function enterDoor(hero, door) {
  if (hasKey) {
    sfx.door.play();
    alert("Level Complete!");
    this.scene.restart();
  }
}

function onHeroVsEnemy(hero, spider) {
  if (hero.body.velocity.y > 0) {
    hero.setVelocityY(-400);
    spider.disableBody(true, true);
    sfx.stomp.play();
  } else {
    this.scene.restart();
  }
}
