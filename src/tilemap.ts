import { Sprite } from "kontra";
import { Globals as g } from "./Globals";

export function collide_map(sprite: Sprite, direction: string) {
  let x = sprite.x - 16;
  let y = sprite.y;
  let w = sprite.width;
  let h = sprite.height;

  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;

  if (direction === "left") {
   x1=x-4;
   y1=y;
   x2=x;
   y2=y+h-4;
  } else if (direction === "right") { 
     x1=x+w;
     y1=y;
     x2=x+w+4;
     y2=y+h-4;
  } else if (direction === "up") {
     x1=x+4;
     y1=y-4;
     x2=x+w-4;
     y2=y;
  } else if (direction === "down") { 
     x1=x;
     y1=y+h;
     x2=x+w;
     y2=y+h;
  }

  if (g.te.tileAtLayer('ground', {x: x1, y: y1}) > 0 ||
    g.te.tileAtLayer('ground', {x: x1, y: y2}) > 0 ||
    g.te.tileAtLayer('ground', {x: x2, y: y1}) > 0 ||
    g.te.tileAtLayer('ground', {x: x2, y: y2}) > 0) {
      return true;
  } else {
    return false;
  }
}
