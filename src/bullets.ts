import { Sprite, imageAssets } from "kontra";
import { Globals } from "./Globals";

import arrow from './img/arrow.png';

export let sprites: Sprite[] = [];

export function update() {
  sprites.forEach((bullet, i)=> {
    bullet.ttl -= 2;
    bullet.update();
    
    if (bullet.ttl <= 0) {
      destroy(i);
    }
  });
}

export function shoot(x: number, y: number, dir: number) {
  let bullet = Sprite({
    x: x,
    y: y,
    dx: 6 * dir,
    scaleX: dir,
    width: 32,
    height: 32,
    image: imageAssets[arrow],
    // custom properties
    ttl: 200,
  });
  sprites.push(bullet);
}

function destroy(bullet: number) {
  sprites.splice(bullet, 1);
}
