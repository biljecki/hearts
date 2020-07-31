
import Phaser from "phaser";
// import logoImg from "./assets/logo.png";

// import SideBar from './Scenes/SideBar';
import Game from './Scenes/Game';
import ControlBoard from './Scenes/ControlBoard';
import ScoreThingy from './Scenes/ScoreThingy.js';


import SCENE_CONSTANTS from './cst/scenePositions';

let config = {
  type: Phaser.AUTO,
  width: SCENE_CONSTANTS.CONTAINER_WIDTH,
  height: SCENE_CONSTANTS.CONTAINER_HEIGHT,
  parent: 'phaser-example',
  backgroundColor: '#000000',
  scene: [ Game, ControlBoard, ScoreThingy ]
};

let game = new Phaser.Game(config);

