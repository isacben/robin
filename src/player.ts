import { Sprite, SpriteSheet, initKeys, keyPressed, onKey, imageAssets, clamp } from "kontra";
import * as bullets from "./bullets";
import * as tilemap from "./tilemap";
import { Globals } from "./Globals";

import robin from "./img/robin.png";

initKeys();

let shot = false;
let friction = 0.85;
let gravity = 0.2;
let acc = 0.3;
let boost = 4;

let landed=false, running=false, jumping=false, falling=false, sliding=false;

// this is the player
export let sprite = Sprite({
  x: 8 * 4 + 16,
  y: 64 * 4,
  dx: 0,
  dy: 0,
  max_dx: 2,
  max_dy: 4,
  width: 32,
  height: 32,
  anchor: {x: 0.5, y: 0},
});

export function init_sheet() {
  Globals.player_sheet = SpriteSheet({
    image: imageAssets[robin], 
    frameWidth: 32,
    frameHeight: 32,
    frameMargin: 4,
    animations: {
      idle: {
        frames: [0,1],
        frameRate: 3,
      },
      run: {
        frames: [2,3,4,3],
        frameRate: 8,
      },
      jump: {
        frames: [6],
      },
      fall: {
        frames: [7],
      },
      slide: {
        frames:[5]
      }
    }
  });
  
  sprite.animations = Globals.player_sheet.animations;
}

export function update() {

  // physics
  sprite.dy += gravity;
  sprite.dx *= friction;

  if (Math.abs(sprite.dx) < 0.2) {
    sprite.dx = 0;
    sliding = false;
  }

  // controls
  if (keyPressed('arrowleft')) {
    if (!falling) {
      running = true;
    } else {
      running = false;
    }
    sprite.setScale(-1, 1);
    sprite.dx -= acc;
  }
  
  if (keyPressed('arrowright')) {
    if (!falling) {
      running = true;
    } else {
      running = false;
    }
    sprite.dx += acc;
    sprite.setScale(1, 1);
  }

  // slide
  if (running &&
      !keyPressed('arrowleft') &&
      !keyPressed('arrowright')) {
    running = false;
    sliding = true;
  }
  
  // jump
  if (keyPressed('x') && landed) {
    sprite.dy -= boost;
    landed = false;
  }

  // check collision up and down
  if (sprite.dy > 0) { // falling
    falling = true;
    landed = false;
    jumping = false;
    // running = false; 
    sprite.dy = clamp(-sprite.max_dy, sprite.max_dy, sprite.dy);

    if (tilemap.collide_map(sprite, "down")) {
      sprite.dy = 0;
      landed = true;
      falling = false;
      sprite.y -= ((sprite.y + sprite.height + 1) % 8) - 1;
    }
  } else if (sprite.dy < 0) {
      jumping = true;
      running = false;

      if (tilemap.collide_map(sprite, "up")) {
        sprite.dy = 0;
      }
  }

  // check collision left and right
  if (sprite.dx < 0) {
    sprite.dx = clamp(-sprite.max_dx, sprite.max_dx, sprite.dx);

    if (tilemap.collide_map(sprite, "left")) {
      sprite.dx = 0;

      // wall correction
      sprite.x -= ((sprite.x - 17 + 1) % 8) - 1;
    }
  } else if (sprite.dx > 0) {
    sprite.dx = clamp(-sprite.max_dx, sprite.max_dx, sprite.dx);
    
    if (tilemap.collide_map(sprite, "right")) {
      sprite.dx = 0;

      // wall correction
      sprite.x += ((sprite.width + 1) % 8) - 1;
    }
  }

  sprite.x += sprite.dx;
  sprite.y += sprite.dy;
}

export function animate() {
  if (running) {
    sprite.playAnimation('run');
  } else if (jumping) {
    sprite.playAnimation('jump');
  } else if (falling) {
    sprite.playAnimation('fall');
  } else if (sliding) {
    sprite.playAnimation('slide');
  } else {
    sprite.playAnimation('idle');
  }
}

export function shoot() {
  onKey('z', function(e) {
    if (!shot) {
      shot = true;
      bullets.shoot(sprite.x, sprite.y, sprite.scaleX);
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
