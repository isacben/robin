import { Sprite } from "kontra";
import { Globals } from "./Globals";

export let sprites: Sprite[] = [];

export function update() {
  sprites.forEach((bullet, i)=> {
    bullet.ttl -= 2;
    bullet.dy = -5;
    bullet.update();
    
    if (bullet.ttl <= 0) {
      destroy(i);
    }
  });
}

export function shoot(x: number, y: number) {
  let bullet = Sprite({
    x: x,
    y: y,
    color: Globals.colors[9],
    width: 32,
    height: 32,

    // custom properties
    ttl: 200,

    render: function() {
      bullet.context.fillStyle = bullet.color;
      bullet.context.beginPath();
      bullet.context.arc(16, 0, 16, 0, 2 * Math.PI);
      bullet.context.fill();
    }
  });
  sprites.push(bullet);
}

function destroy(bullet: number) {
  sprites.splice(bullet, 1);
}
