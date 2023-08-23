import { Sprite, initKeys, keyPressed, onKey, offKey, imageAssets, clamp } from "kontra";
import * as bullets from "./bullets";
import * as tilemap from "./tilemap";
import { Globals } from "./Globals";

import robin from "./img/robin.png";

initKeys();

let shot = false;
let friction = 0.85;
let gravity = 0.2;
let acc = 0.5;
let boost = 4;

export let landed = false;
// this is the player
export let sprite = Sprite({
  x: 64 * 4,
  y: 64 * 4,
  dx: 0,
  dy: 0,
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
    sprite.setScale(1, 1);
  }
  
  if (keyPressed('arrowright')) {
    sprite.dx += acc;
    sprite.setScale(-1, 1);
  }
  
  // jump
  if (keyPressed('x') && Globals.player_on_ground) {
    sprite.dy -= boost;
    Globals.player_on_ground = false;
  }

  // check collision up and down
  if (sprite.dy > 0) {
    Globals.player_on_ground = false;

    sprite.dy = clamp(0, sprite.dy, 4);

    if (tilemap.collide_map(sprite, "down")) {
      Globals.player_on_ground = true;
      sprite.dy = 0;
      sprite.y -= (sprite.y + sprite.height) % 8;
    }
  } else if (sprite.dy < 0) {
      if (tilemap.collide_map(sprite, "up")) {
        sprite.dy = 0;
      }
  }

  sprite.x += sprite.dx;
  sprite.y += sprite.dy;

  if (sprite.x <= 16) {
    sprite.dx = 0;
  }

  if (sprite.x >= 120*4+16) {
      sprite.dx = 0;
      sprite.x = 120*4+16;
  }

  onKey('z', function(e) {
    if (!shot) {
      shot = true;
      bullets.shoot(sprite.x, sprite.y);
    }
  });
  onKey('z', function(e) {
    shot = false;
  }, {"handler": "keyup"}); 
}

export function control(canvas: HTMLCanvasElement) {
  // if (sprite.x > canvas.width) {
    // sprite.x = -sprite.width;
  // }
}
