import Phaser from "phaser";
import yellowHeart from "./assets/yellow_heart.png";
import redHeart from "./assets/redHeart.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 800,
  scene: {
    preload: preload,
    create: create,
    update: update,
    onObjectClicked: onObjectClicked
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("yellowHeart", yellowHeart);
  this.load.image("redHeart", redHeart);
}

function create() {
  this.onObjectClicked = onObjectClicked;
  this.easeOut = easeOut;

  // let hearts = [];

  // for (let i = 0; i<5; i++) {

  // }

  // this.add.image(200, 100, 'logo').setOrigin(0, 0);

  this.asteroids = [];
  this.positions = [];

  for (let i = 0; i < 100; i++) {
    this.positions.push({
      x: 2500,
      y: 2500
    });
  }

  for (let i = 0; i < this.positions.length; i++) {
    let pos = this.positions[i];

    let therock = this.add.sprite(pos.x, pos.y, "yellowHeart");

    therock.setData("vx", Math.random(0.005) - 0.0025);
    therock.setData("vy", Math.random(0.005) - 0.0025);
    therock.setData("id", i);

    therock.setOrigin(0);
    therock.setScale(Phaser.Math.FloatBetween(0.1, 0.3));

    let rotationSpeed = 0;

    let willRotate = chance(15);
    if (willRotate) rotationSpeed = (Math.random() - 0.5) / 10;

    therock.setData("rotate", rotationSpeed);

    therock.setInteractive();

    this.asteroids.push(therock);
  }

  this.input.on("gameobjectdown", this.onObjectClicked.bind(this));
}

function onObjectClicked(pointer, gameObject) {
  console.log(gameObject);
  if (gameObject) {
    gameObject.setTexture("redHeart");
    // this.asteroids = this.asteroids.filter(
    //   heart => heart.getData("id") !== gameObject.getData("id")
    // );
    // gameObject.destroy();

    let self = this;

    this.tweens.add({
      targets: gameObject,
      scaleX: 1,
      scaleY: 1,
      ease: "Sine.easeInOut",
      duration: 300,
      repeat: 0,
      onComplete: onCompleteGrowHandler,
      onCompleteParams: [self]
    });
  }
}

function onCompleteGrowHandler(tween, targets, self) {
  const tself = self;
  self.tweens.add({
    targets: targets[0],
    scaleX: 0,
    scaleY: 0,
    ease: "Sine.easeOut",
    duration: 300,
    repeat: 0,
    onComplete: onCompleteShrinkHandler,
    onCompleteParams: [tself]
  });
}

function onCompleteShrinkHandler(tween, targets, self) {
  const gameObject = targets[0]
  
  self.asteroids = self.asteroids.filter(
    heart => heart.getData("id") !== gameObject.getData("id")
  );
  console.log(self.asteroids.length)
  gameObject.destroy();
}

function update(time, delta) {
  for (let i = 0; i < this.asteroids.length; i++) {
    let therock = this.asteroids[i];

    therock.x -= (therock.getData("vx") * delta) / 4;
    therock.y -= (therock.getData("vy") * delta) / 4;

    therock.rotation += therock.getData("rotate");

    if (
      therock.x <= -400 ||
      therock.x >= 1250 ||
      therock.y < -400 ||
      therock.y > 810
    ) {
      // console.log(therock.x, therock.y)

      let py = Math.round(Math.random());
      let px = Math.round(Math.random());

      if (px && py) {
        therock.x = Math.random(600) - 300;
        therock.y = Math.random(400) - 300;
        therock.setData("vy", -Math.random(0.1));
        therock.setData("vx", -Math.random(0.1));
      }

      if (px && !py) {
        therock.x = Math.random(600) - 300;
        therock.y = Math.random(400) + 800;
        therock.setData("vy", Math.random(0.1));
        therock.setData("vx", -Math.random(0.1));
      }

      if (!px && py) {
        therock.x = Math.random(600) + 1200;
        therock.y = Math.random(400) - 300;
        therock.setData("vy", -Math.random(0.1));
        therock.setData("vx", Math.random(0.1));
      }

      if (!px && !py) {
        therock.x = Math.random(600) + 1200;
        therock.y = Math.random(400) + 800;
        therock.setData("vy", Math.random(0.1));
        therock.setData("vx", Math.random(0.1));
      }
    }
  }
}

function chance(x) {
  let c = Math.random() * 100;
  //console.log(c)
  return x > c;
}

const easeOut = (self, gameObject) => {
  console.log("easeout params", self, gameObject);

  self.tweens.add({
    targets: gameObject,
    scaleX: 1,
    scaleY: 1,
    ease: "Sine.easeInOut",
    duration: 300,
    // delay: i * 50,
    repeat: 0,
    yoyo: true
    //onComplete: (self, gameObject) => { self.easeOut(self, gameObject)},
  });
};
