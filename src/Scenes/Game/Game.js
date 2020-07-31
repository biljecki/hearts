import SCENE_CONSTANTS from "../../cst/scenePositions";

import brko1 from "../../assets/brko_1.png";
import brko2 from "../../assets/brko_2.png";
import brko3 from "../../assets/brko_3.png";
import corner from "../../assets/corner.png";

import cursor from '../../assets/cursor.cur';

const LEVELS = {
  LEVEL_1: {
    LEVEL: 1,
    SCALE: 1,
    IMAGE: "brko1",
    SPEED_MIN: 0.8,
    SPEED_MAX: 1,
    SCORE: 20
  },
  LEVEL_2: {
    LEVEL: 2,
    SCALE: 1.5,
    IMAGE: "brko2",
    SPEED_MIN: 0.5,
    SPEED_MAX: 0.8,
    SCORE: 5,
  },
  LEVEL_3: {
    LEVEL: 3,
    SCALE: 2,
    IMAGE: "brko3",
    SPEED_MIN: 0.2,
    SPEED_MAX: 0.5,
    SCORE: 1
  },
}

const GAME_MAP_SIZE = 1600;

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game", active: true });
    this.onCompleteGrowHandler = this.onCompleteGrowHandler.bind(this);
    this.onCompleteShrinkHandler = this.onCompleteShrinkHandler.bind(this);
    this.index = 0;
  }


  //TODO: REFACTOR +400 - 400 PX TO SMT MORE APPROPIRATE N00B

  getSpeed(level){
    let vq = Math.round(Math.random());

    if (vq==0) { 
      vq = -1 
    } else {
      vq = 1
    }
    return vq * (Math.random(level.SPEED_MIN) + level.SPEED_MAX)
  }

 //CUSTOM METHODS::: 
  generateHeart(level, posX, posY){

    let py = Math.round(Math.random());
    let px = Math.round(Math.random());
    let posx, posy, vx, vy;

    if (px && py) {
      posx = -400;
      posy = -400;
      
      vy = Math.random(0.1);
      vx = Math.random(0.1);
    }

    if (px && !py) {
      posx = -400;
      posy = GAME_MAP_SIZE + 400;
      vy = -Math.random(0.1);
      vx = Math.random(0.1);
    }

    if (!px && py) {
      posx = GAME_MAP_SIZE + 400;
      posy = -400;
      vy = Math.random(0.1);
      vx = -Math.random(0.1);
    }

    if (!px && !py) {
      posx = GAME_MAP_SIZE + 400;
      posy = GAME_MAP_SIZE + 400;
      vy = -Math.random(0.1);
      vx = -Math.random(0.1);
    }

    if (posX) {
      vy = this.getSpeed(level)
      vx = this.getSpeed(level)
    }
    
    

    const heart = this.add.sprite(posX || posx, posY || posy, level.IMAGE);

    heart.setData("vx", vx);
    heart.setData("vy", vy);
    heart.setData("id", this.index++);
    heart.setData("level", level)

    heart.setOrigin(0.5);
    // heart.setScale(Phaser.Math.FloatBetween(0.1, 0.3));
    heart.setScale(level.SCALE);

    let rotationSpeed = 0;

    rotationSpeed = (Math.random() - 0.5) / 10;

    heart.setData("rotate", rotationSpeed);
    heart.setData("clickable", true);

    heart.setInteractive();
    return heart;
  }

  onObjectClicked(_, gameObject) {
    if (gameObject && gameObject.getData("clickable")) {
  
      gameObject.setData('clickable', false)
  
      gameObject.depth = 1


      gameObject.setTexture(gameObject.getData("level").IMAGE);
     
      let self = this;
  
      this.tweens.add({
        targets: gameObject,
        scaleX: randomGen(),
        scaleY: randomGen(),
        ease: "Sine.easeInOut",
        duration: 600,
        repeat: 0,
        onComplete: this.onCompleteGrowHandler,
      });
    }
  }

  onCompleteGrowHandler(tween, [heart], self) {

    const level = heart.getData("level").LEVEL;

    this.score += heart.getData("level").SCORE
    this.registry.set('score', this.score);
    
    if (level > 1) {
      
      this.hearts.push(this.generateHeart(LEVELS["LEVEL_" + (level-1)],heart.x, heart.y))
      this.hearts.push(this.generateHeart(LEVELS["LEVEL_" + (level-1)],heart.x, heart.y))
    }

    heart.destroy();
  }
  
  onCompleteShrinkHandler(tween, [heart]) {
    this.hearts = this.hearts.filter(
      hrt => hrt.getData("id") !== heart.getData("id")
    );
   
    heart.destroy();
    
  }

  preload() {
    this.load.image("brko3", brko3);
    this.load.image("brko2", brko2);
    this.load.image("brko1", brko1);

    this.load.image("corner", corner);
  }

  create() {

    this.input.setDefaultCursor(`url(${cursor}), pointer`);

    //CAMERA
    const camera = this.cameras.main;

    camera.setViewport(5, 5, 790, 790);
    camera.setBackgroundColor("rgba(255, 0, 0, 0.5)");
    camera.setBounds(0, 0, GAME_MAP_SIZE, GAME_MAP_SIZE);
    camera.centerToSize();


    //MINIMAP
    this.minimap = this.cameras.add(850, 400, 300, 300).setZoom(300/1600).setName('mini');
    this.minimap.setBackgroundColor(0xffffff);
    this.minimap.centerToSize();
    this.minimap.setBounds(0, 0, GAME_MAP_SIZE, GAME_MAP_SIZE);

    //MINIMAP THINGY
    //TODO: MAKE INPUTS MORE DYNAMIC
    this.r3 = this.add.rectangle(790, 790, GAME_MAP_SIZE/2,GAME_MAP_SIZE/2);
    this.r3.setStrokeStyle(3, 0x1a65ac);
    this.r3.setDepth(2)

    camera.ignore(this.r3)
    

    //CONTROLS
    var controlConfig = {
      camera: this.cameras.main,
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: .5
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );

    const cursors = this.input.keyboard.createCursorKeys();

    //CORNERS-BORDERS
    let topLeftCorner = this.add
      .sprite(0, 0, "corner")
      .setOrigin(0, 0)
      .setScale(0.1).setDepth(1);
    let topRightCorner = this.add
      .sprite(GAME_MAP_SIZE, 60, "corner")
      .setOrigin(1, 0)
      .setScale(0.1)
      .setAngle(90).setDepth(1);
    let bottomRighttCorner = this.add
      .sprite(GAME_MAP_SIZE - 60, GAME_MAP_SIZE, "corner")
      .setOrigin(1, 0)
      .setScale(0.1)
      .setAngle(180).setDepth(1);
    let bottomLeftCorner = this.add
      .sprite(0, GAME_MAP_SIZE, "corner")
      .setOrigin(0, 0)
      .setScale(0.1)
      .setAngle(270).setDepth(1);

    //GAME OBJECTS
    this.hearts = [];
    for (let i = 0; i < 50; i++) {
      this.hearts.push(this.generateHeart(LEVELS.LEVEL_3));
    }

    //EVENT LISTNERS
    this.input.on("gameobjectdown", this.onObjectClicked.bind(this));   


    //SCORE
    this.score = 0;
    this.registry.set('score', this.score);

    // this.minimap.i

    
  }

  update(time, delta) {

    const camera = this.cameras.main;

    this.controls.update(delta);

    this.r3.x = camera.scrollX + 790/2;
    this.r3.y = camera.scrollY+ 790/2;


    for (let i = 0; i < this.hearts.length; i++) {
      let heart = this.hearts[i];
  
      heart.x += (heart.getData("vx") * delta) / 4;
      heart.y += (heart.getData("vy") * delta) / 4;
  
      heart.rotation += heart.getData("rotate");
      heart.getData("level")

      if ( heart.x <=-500 || heart.x > GAME_MAP_SIZE + 500) {
          heart.setData("vx",  heart.getData("vx") * -1) 
        }
        
      if (
        heart.y < -500 ||
        heart.y > GAME_MAP_SIZE + 500
      ) {
        heart.setData("vy",  heart.getData("vy") * -1) 
      }


      // if (
      //   heart.x <=-500 ||
      //   heart.x > GAME_MAP_SIZE + 500 ||
      //   heart.y < -500 ||
      //   heart.y > GAME_MAP_SIZE + 500
      // ) {
      //   let level = heart.getData("level").LEVEL;
      //   this.hearts[i] = this.generateHeart(level);
      //   this.hearts[i].destroy();    
      // }
    
    }
  }
}

//TODO: move this to util
const chance = x => x < Math.random() * 100;

export default Game;


const randomGen = () => {
  return Math.random() * 10 + 2
}