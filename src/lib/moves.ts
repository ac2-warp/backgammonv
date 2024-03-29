"use client";
import { DiceRoll, PlayerColour, Point } from "./interfaces";

export function isOccupied(
  point: Point,
  playerColour: PlayerColour | undefined
): boolean {
  if (point.checkerCount > 0 && point.occupiedBy?.colour !== playerColour) {
    return true;
  }
  return false;
}

export function canBeTaken(point: Point, playerColour: PlayerColour): boolean {
  if (point.checkerCount === 1 && point.occupiedBy?.colour !== playerColour) {
    return true;
  }
  return false;
}

export function canMoveHere(
  toPointNumber: number,
  playerColour: PlayerColour,
  view: Point[]
): boolean {
  const toPoint = view.find((point) => point.pointNumber === toPointNumber);

  if (toPoint && toPoint.checkerCount === 5) return false;

  if (toPoint && isOccupied(toPoint, playerColour)) {
    if (canBeTaken(toPoint, playerColour)) return true;
  }

  if (toPoint && !isOccupied(toPoint, playerColour)) return true;

  return false;
}

export function removeFromDice(
  totalPointsMoved: number,
  dice: DiceRoll
): DiceRoll {
  const die0 = dice[0];
  const die1 = dice[1];
  const dieCombined = dice[0] + dice[1];

  if (totalPointsMoved === die0) return [0, die1];
  if (totalPointsMoved === die1) return [die0, 0];
  if (totalPointsMoved === dieCombined) return [0, 0];

  return [die0, die1];
}
