import SCENE_CONSTANTS from "../../cst/scenePositions";

class ControlBoard extends Phaser.Scene {
  constructor() {
    super({ key: "ControlBoard", active: true });

    // this.onCompleteGrowHandler = this.onCompleteGrowHandler.bind(this);
    // this.onCompleteShrinkHandler = this.onCompleteShrinkHandler.bind(this);
  }


 

  preload() {
    
  }

  create() {
    const camera = this.cameras.main;

    camera.setViewport(800, 5, 400, 300);
    camera.setBackgroundColor("rgba(0, 255, 0, 0.5)");

    this.score = this.add.text(100, 100, 'Rezultat: 0 lol');
    this.help = this.add.text(100, 120, 'Pomerati sa slovma wasd');


    this.registry.events.on('changedata', this.updateScore, this);

  
  }

  updateScore(parent, key, data){
      this.score.setText('Rezultat: ' + data);
  }

  update(time, delta) {
  

  }
}

//TODO: move this to util
const chance = x => x < Math.random() * 100;

export default ControlBoard;

