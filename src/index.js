import Phaser from "phaser";
import logoImg from "./assets/yellow_heart.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 800,
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("asteroid", logoImg);
}

function create() {

  // let hearts = [];

  // for (let i = 0; i<5; i++) {

  // }

  // this.add.image(200, 100, 'logo').setOrigin(0, 0);

  this.asteroids = [];
this.positions = [];
//   this.positions = [
//     { x: 37, y: 176 },
//     { x: 187, y: 66 },
//     { x: 177, y: 406 },
//     { x: 317, y: 256 },
//     { x: 417, y: -10 },
//     { x: 487, y: 336 },
//     { x: 510, y: 116 },
//     { x: 727, y: 186 },
//     { x: 697, y: 10 },
//     { x: 597, y: 216 },
//     { x: 695, y: 366 },
//     { x: 900, y: 76 },
//     { x: 1008, y: 315 }
// ];

  for (let i = 0; i < 30; i++){
    this.positions.push({
      x: 2000,
      y: 2000,
    })
  }


  for (let i = 0; i < this.positions.length; i++)
  {
      let pos = this.positions[i];

      let therock = this.add.sprite(pos.x, pos.y, 'asteroid');

      therock.setData('vx', Math.random(0.005)-0.0025);
      therock.setData('vy', Math.random(0.005)-0.0025);

      therock.setOrigin(0);
      therock.setScale(Phaser.Math.FloatBetween(0.1, 0.3));

      this.asteroids.push(therock);
  }

}


function update (time, delta)
    {
        for (let i = 0; i < this.asteroids.length; i++)
        {
            let therock = this.asteroids[i];

            therock.x -= therock.getData('vx') * delta/4;
            therock.y -= therock.getData('vy') * delta/4;

            //console.log(therock.getData('vx') * delta)


            if (therock.x <= -400 || therock.x >= 1250 || therock.y < -400 || therock.y > 810)
            {
              
                // console.log(therock.x, therock.y)

                let py = Math.round(Math.random());
                let px = Math.round(Math.random());

                if (px && py) {
                  therock.x = Math.random(600)-300;
                  therock.y = Math.random(400)-300;
                  therock.setData('vy', -Math.random(0.1));
                  therock.setData('vx', -Math.random(0.1));
                }

                if (px && !py) {
                  therock.x = Math.random(600)-300;
                  therock.y = Math.random(400)+800;
                  therock.setData('vy', Math.random(0.1));
                  therock.setData('vx', -Math.random(0.1));
                }

                if (!px && py) {
                  therock.x = Math.random(600)+1200;
                  therock.y = Math.random(400)-300;
                  therock.setData('vy', -Math.random(0.1));
                  therock.setData('vx', Math.random(0.1));
                }

                if (!px && !py) {
                  therock.x = Math.random(600)+1200;
                  therock.y = Math.random(400)+800;
                  therock.setData('vy', Math.random(0.1));
                  therock.setData('vx', Math.random(0.1));
                }

                // therock.y = 0;
                // therock.x = 0;

                // console.log(py);

                //console.log(py)

                // if (py) {
                //   therock.y = Math.random(800);
                //   therock.setData('vy', Math.random(0.1));
                // } 
                // else {
                //   therock.y = 300;
                //   therock.setData('vy', Math.random(0.1));
                //   console.log(therock.y)
                // }

                // if (px) {
                //   therock.x = Math.random(1224);
                //   therock.setData('vx', -Math.random(0.1));
                // } 
                // else {
                //   therock.x = ;
                //   therock.setData('vx', +Math.random(0.1));
                // }



                //therock.x = 400;
                // therock.y = 1224;
                // therock.setData('vx', Math.random(0.1)-0.05);
                // therock.setData('vy', Math.random(0.1)-0.05);
            }
        }
    }