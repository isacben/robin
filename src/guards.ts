import { Sprite, collides, imageAssets } from "kontra";
import * as player from "./player";
import * as bullets from "./bullets";
import { Globals } from "./Globals";
import guard_img from './img/guard.png';

export let sprites: Sprite[] = [];

export function update() {
  sprites.forEach((guard, i)=> {
    guard.update();
    
    if (guard.y >= 600) {
      destroy(i);
    }

    bullets.sprites.forEach((bullet, j) => {
      if (collides(guard, bullet)) {
        destroy(i);
        bullet.ttl = 0;
      }
    });

    if (collides(guard, player.sprite)) {
      destroy(i);
      // player.sprite.color = Globals.colors[Math.floor(Math.random() * 14) + 1];
      Globals.shake = 9;
    }
  });
}

export function spawn() {
  if (Globals.T % 30 === 0) {
    let guard = Sprite({
      x: Math.floor(Math.random() * 120*4) + 1,
      y: -8*4,
      width: 32,
      height: 32,
      image: imageAssets[guard_img],
      dy: 2 
    });
    sprites.push(guard);
  }
}

function destroy(guard: number) {
  sprites.splice(guard, 1);
}
