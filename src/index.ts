import { init, Sprite, Text, GameLoop, TileEngine, load, imageAssets} from "kontra";
import * as player from "./player";
import * as bullets from "./bullets"; 
import * as guards from "./guards";

import { Globals } from "./Globals";

import tiles from './img/tiles.png';
import robin from './img/robin.png';
import guard_img from './img/guard.png';

let { canvas } = init();

canvas.style.position = 'absolute';

camera(10, 10);
let message: string = "debug...";
let debug = Text({
  text: message,
  font: '12px Arial',
  color: Globals.colors[7],
  x: 2 * 4,
  y: 123 * 4,
  textAlign: 'left'
});

load(tiles, robin, guard_img).then(function() {
  let tileEngine = TileEngine({
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
      data: Globals.level_1
    }]
  });

  player.sprite.image = imageAssets[robin];

  let loop = GameLoop({ 
    update: function() { 
      camera(10 + Globals.shake * (Math.floor(Math.random() * 2) - 1), 10 + Globals.shake * (Math.floor(Math.random() * 2) - 1));

      if (Globals.shake > 0) {
        Globals.shake *= 0.5;
      }

      Globals.T += 1;
      player.move();
      player.sprite.update();
      // player.control(canvas);

      if (tileEngine.layerCollidesWith('ground', player.sprite)) {
        Globals.player_on_ground = true;
      }

      bullets.update();

      guards.spawn();
      guards.update();
      message = 'Guards: ' + guards.sprites.length; 
      message += ' Bullets: ' + bullets.sprites.length; 
      debug.text = message;
    },
    render: function() {
      
      tileEngine.render();
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
})


function camera(left: number, top: number) {
  canvas.style.left = left + "px";
  canvas.style.top = top + "px";
}