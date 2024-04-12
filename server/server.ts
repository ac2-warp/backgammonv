import http from "http";
import express from "express";
import { Server } from "socket.io";
import {
  ChoosePlayerEmit,
  DiceRollEmit,
  MoveEmit,
  SelectedCheckerEmit,
} from "./interfaces";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("roll", ({ senderUuid, diceOne, diceTwo }: DiceRollEmit) => {
    if (
      senderUuid === undefined ||
      diceOne === undefined ||
      diceTwo === undefined
    )
      return;

    console.debug("roll", { senderUuid, diceOne, diceTwo });

    socket.broadcast.emit("roll", {
      senderUuid,
      diceOne,
      diceTwo,
    } as DiceRollEmit);
  });

  socket.on("update-dice", ({ senderUuid, diceOne, diceTwo }: DiceRollEmit) => {
    if (
      senderUuid === undefined ||
      diceOne === undefined ||
      diceTwo === undefined
    )
      return;

    console.debug("update-dice", { senderUuid, diceOne, diceTwo });

    socket.broadcast.emit("update-dice", {
      senderUuid,
      diceOne,
      diceTwo,
    } as DiceRollEmit);
  });

  socket.on(
    "move",
    ({ senderUuid, whiteBoardView, blackBoardView }: MoveEmit) => {
      if (
        senderUuid === undefined ||
        whiteBoardView === undefined ||
        blackBoardView === undefined
      )
        return;

      console.debug("move", { senderUuid });

      socket.broadcast.emit("move", {
        senderUuid,
        whiteBoardView,
        blackBoardView,
      } as MoveEmit);
    }
  );

  socket.on("choose-player", ({ senderUuid, iam }: ChoosePlayerEmit) => {
    if (senderUuid && iam)
      socket.broadcast.emit("choose-player", { senderUuid, iam });
  });

  socket.on("reset-game", (senderUuid: string) => {
    if (!senderUuid) return;

    console.debug("reset-game", senderUuid);
    socket.broadcast.emit("reset-game", senderUuid);
  });

  socket.on("select-checker", ({ senderUuid, point }: SelectedCheckerEmit) => {
    if (!senderUuid || !point) return;

    console.debug("select-checker", { senderUuid, point });

    socket.broadcast.emit("select-checker", {
      senderUuid,
      point,
    } as SelectedCheckerEmit);
  });

  socket.on("swop-player", (senderUuid: string) => {
    if (!senderUuid) return;

    console.debug("swop-player", senderUuid);
    socket.broadcast.emit("swop-player", senderUuid);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
