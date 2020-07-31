// import SCENE_CONSTANTS from "../../cst/scenePositions";

import brko1 from "../assets/brko_1.png";
import brko2 from "../assets/brko_2.png";
import brko3 from "../assets/brko_3.png";

class ScoreThingy extends Phaser.Scene {
  constructor() {
    super({ key: "ScoreThingy", active: true });

    // this.onCompleteGrowHandler = this.onCompleteGrowHandler.bind(this);
    // this.onCompleteShrinkHandler = this.onCompleteShrinkHandler.bind(this);
  }


 

  preload() {
    
  }

  create() {
    const camera = this.cameras.main;

    camera.setViewport(1200, 5, 400, 300);
    camera.setBackgroundColor("rgba(0, 255, 255, 0.5)");

    this.add.text(40, 40, '1 BOD');

    this.add.text(40, 150, '5 BODA');

    this.add.text(40, 250, '20 BODEVA');


    const br1 = this.add.sprite(180, 50, "brko31");
    const br2 = this.add.sprite(180, 150, "brko21");
    const br3 = this.add.sprite(180, 250, "brko11");

  }

  preload() {
    this.load.image("brko31", brko3);
    this.load.image("brko21", brko2);
    this.load.image("brko11", brko1);
  }

  updateScore(parent, key, data){
    this.score.setText('Score: ' + data);
  }

  update(time, delta) {
  

  }
}

//TODO: move this to util
const chance = x => x < Math.random() * 100;

export default ScoreThingy;

