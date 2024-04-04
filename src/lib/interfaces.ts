export type View = "WhiteHomeBoard" | "BlackHomeBoard";
export type PlayerColour = "white" | "black";
export type DiceRoll = [number, number];

export interface Point {
  pointNumber: number;
  occupiedBy: Player | null;
  checkerCount: number;
  location: "top" | "bottom" | "bar";
  selected: boolean;
  possibleMove: boolean;
  bareOff: boolean;
}

export interface Player {
  colour: PlayerColour; // player colour
  barCount: number; // on bar
  offCount: number; // bared off
  homeCount: number; // checkers on home ground
  canBareOff?: boolean; // can bare off
}
