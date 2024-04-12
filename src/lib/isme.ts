import { PlayerColour } from "./interfaces";

export function isMe(senderUuid: string) {
  const uuid = localStorage.getItem("uuid");
  if (!uuid) return false;
  if (uuid.toString() === senderUuid.toString()) return true;
  return false;
}

export function isMyTurn(playerColour: PlayerColour) {
  const iam = localStorage.getItem("uuid");
  if (iam !== playerColour) return false;
  return true;
}
