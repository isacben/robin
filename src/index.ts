import { init, Text, GameLoop, TileEngine, load, imageAssets} from "kontra";
import * as player from "./player";
import * as bullets from "./bullets"; 
import * as guards from "./guards";

import { Globals as g } from "./Globals";

import tiles from './public/tiles.png';
import robin from './public/robin.png';
import guard_img from './public/guard.png';
import arrow_img from './public/arrow.png';

let { canvas } = init();

canvas.style.position = 'absolute';

camera(10, 10);
let message: string = "debug...";
let debug = Text({
  text: message,
  font: '12px Arial',
  color: '#FFF1E8',
  x: 8 * 4,
  y: 8 * 4,
  textAlign: 'left'
});


load(tiles, robin, guard_img, arrow_img).then(function() {
  g.te = TileEngine({
    // tile size
    tilewidth: 32,
    tileheight: 32,

    // map size in tiles
    width: 16,
    height: 16,

    // tileset object
    tilesets: [{
      firstgid: 1,
      image: imageAssets[tiles] 
    }],

    // layer object
    layers: [{
      name: 'ground',
      data: g.l1
    }]
  });

  // initialize sprites with animations
  player.init_sheet();
    
  let loop = GameLoop({ 
    update: function() { 
      camera(10 + g.shake * (Math.floor(Math.random() * 2) - 1), 10 + g.shake * (Math.floor(Math.random() * 2) - 1));

      if (g.shake > 0) {
        g.shake *= 0.5;
      }

      g.T += 1;
      player.update();
      player.shoot();
      player.sprite.update();
      player.animate();

      // player.control(canvas);

      bullets.update();

      guards.spawn();
      guards.update();
      message = 'Frame: ' + player.sprite.currentAnimation.isStopped; 
      message += ' Y: ' + player.sprite.y; 
      message += ' DY: ' + player.sprite.dy; 
      debug.text = message;
    },

    render: function() {
      
      g.te.render();
      player.sprite.render();
      bullets.sprites.forEach(bullet => {
        bullet.render();
      });

      guards.sprites.forEach(guard => {
        guard.render();
      });

      debug.render();
    }
  });

  loop.start();
}).catch(function(err) {
  console.log(err);
});


function camera(left: number, top: number) {
  canvas.style.left = left + "px";
  canvas.style.top = top + "px";
}