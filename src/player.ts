import { Sprite, initKeys, keyPressed, onKey, offKey, imageAssets } from "kontra";
import * as bullets from "./bullets";
import { Globals } from "./Globals";

import robin from "./img/robin.png";

initKeys();

let shot = false;
let friction = 0.85;
let gravity = 0.2;
let acc = 0.5;
let boost = 5.2;

export let landed = false;
// this is the player
export let sprite = Sprite({
  x: 64 * 4,
  y: 64 * 4,
  width: 32,
  height: 32,
  anchor: {x: 0.5, y: 0},
});

export function update() {
  // physics
  sprite.dy += gravity;
  sprite.dx *= friction;

  // controls
  if (keyPressed('arrowleft')) {
    sprite.dx -= acc;
    sprite.scaleX = 1;
  }
  
  if (keyPressed('arrowright')) {
    sprite.dx += acc;
    sprite.scaleX = -1;
  }
  
  // jump
  if (keyPressed('z') && Globals.player_on_ground) {
    sprite.dy -= boost;
    Globals.player_on_ground = false;
  }

  // check collision up and down
  if (sprite.dy > 0) {
    Globals.player_on_ground = false;
    if (Globals.tileEngine.layerCollidesWith('ground', sprite)) {
      Globals.player_on_ground = true;
      sprite.dy = 0;
      sprite.y -= (sprite.y + sprite.height) % 8;
    }

  }
  if (sprite.x <= 15) {
    sprite.x = 15;
  }

  if (sprite.x >= 124*4) {
      sprite.x = 124*4;
  }

  onKey('x', function(e) {
    if (!shot) {
      shot = true;
      bullets.shoot(sprite.x, sprite.y);
    }
  });
  onKey('x', function(e) {
    shot = false;
  }, {"handler": "keyup"}); 
}

export function control(canvas: HTMLCanvasElement) {
  // if (sprite.x > canvas.width) {
    // sprite.x = -sprite.width;
  // }
}
