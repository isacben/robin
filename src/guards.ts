import { Sprite, collides, imageAssets } from "kontra";
import * as player from "./player";
import * as bullets from "./bullets";
import { Globals as g } from "./Globals";
import guard_img from './public/guard.png';

export let sprites: Sprite[] = [];

export function update() {
  sprites.forEach((guard, i)=> {
    guard.update();
    
    if (guard.y >= 600) {
      destroy(i);
    }

    bullets.sprites.forEach((bullet) => {
      if (collides(guard, bullet)) {
        destroy(i);
        bullet.ttl = 0;
      }
    });

    if (collides(guard, player.sprite)) {
      destroy(i);
      // player.sprite.color = Globals.colors[Math.floor(Math.random() * 14) + 1];
      g.shake = 9;
    }
  });
}

export function spawn() {
  if (g.T % 30 === 0) {
    let guard = Sprite({
      x: Math.floor(Math.random() * 120*4) + 1,
      y: -8*4,
      width: 8,
      height: 8,
      scaleX: 4,
      scaleY: 4,
      image: imageAssets[guard_img],
      dy: 2 
    });
    sprites.push(guard);
  }
}

function destroy(guard: number) {
  sprites.splice(guard, 1);
}
