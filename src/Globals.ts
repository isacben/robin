import { Sprite, TileEngine } from "kontra";

export class Globals {
  // public static bullets: Sprite[] = [];
  public static T: number = 0;
  public static shake: number = 0;
  public static is_shaking = false;
  public static player_on_ground = false;
  public static colors: string[] = [
    '#000000', '#1D2B53', '#7E2553', '#008751', // 0  1  2  3
    '#AB5236', '#5F574F', '#C2C3C7', '#FFF1E8', // 4  5  6  7
    '#FF004D', '#FFA300', '#FFEC27', '#00E436', // 8  9  10 11
    '#29ADFF', '#83769C', '#FF77A8', '#FFCCAA'  // 12 13 14 15
  ]

  public static tileEngine: TileEngine;

  public static level_1: number[] = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]
}

export default Globals;
