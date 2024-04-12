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

// socket.io
export interface DiceRollEmit {
  senderUuid: string | null;
  diceOne: number | null;
  diceTwo: number | null;
}

export interface ChoosePlayerEmit {
  senderUuid: string | undefined | null;
  iam: PlayerColour | undefined | null;
}

export interface MoveEmit {
  senderUuid: string | undefined | null;
  whiteBoardView: Point[] | undefined | null;
  blackBoardView: Point[] | undefined | null;
}
export interface SelectedCheckerEmit {
  senderUuid: string | undefined | null;
  point: number | undefined | null;
}
