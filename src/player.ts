import { Sprite, initKeys, keyPressed, onKey, offKey, imageAssets } from "kontra";
import * as bullets from "./bullets";
import { Globals } from "./Globals";

import robin from "./img/robin.png";

initKeys();

let shot = false;

// this is the player
export let sprite = Sprite({
  x: 64 * 4,
  y: 64 * 4,
  width: 32,
  height: 32,
  anchor: {x: 0.5, y: 0},
});

export function move() {
  if (Globals.player_on_ground) {
    sprite.dy = 0;
    sprite.ddy = 0;
  }

  if (keyPressed('arrowleft')) {
    sprite.x -= 3;
    sprite.scaleX = 1;
  }
  
  if (keyPressed('arrowright')) {
    sprite.x += 3;
    sprite.scaleX = -1;
  }
  
  if (keyPressed('z')) {
    sprite.y -= 10;
    sprite.dy = 2;
    sprite.ddy = 0;
    Globals.player_on_ground = false;
  }

  if (sprite.x <= 15) {
    sprite.x = 15;
  }

  if (sprite.x >= 124*4) {
      sprite.x = 124*4;
  }

  onKey('space', function(e) {
    if (!shot) {
      shot = true;
      bullets.shoot(sprite.x, sprite.y);
    }
  });
  onKey('space', function(e) {
    shot = false;
  }, {"handler": "keyup"}); 
}

export function control(canvas: HTMLCanvasElement) {
  // if (sprite.x > canvas.width) {
    // sprite.x = -sprite.width;
  // }
}
