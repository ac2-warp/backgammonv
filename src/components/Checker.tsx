import { useGamePlay } from "@/hooks/useGamePlay";
import { PlayerColour, Point, SelectedCheckerEmit } from "@/lib/interfaces";
import { isMe } from "@/lib/isme";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

export function Checker({ point, index }: { point: Point; index: number }) {
  const checkerColor = () => {
    if (!point.occupiedBy) return "bg-gray-500";

    if (
      ((point.location === "bottom" && index === point.checkerCount) ||
        (point.location === "top" && index === 1)) &&
      point.selected === true &&
      point.occupiedBy.colour === "white"
    )
      return "border-4 border-red-800 bg-white";
    if (
      ((point.location === "bottom" && index === point.checkerCount) ||
        (point.location === "top" && index === 1)) &&
      point.selected === true &&
      point.occupiedBy.colour === "black"
    )
      return "border-4 border-red-800 bg-black";

    if (point.occupiedBy.colour === "white") return "bg-white";

    return "bg-black";
  };

  return (
    <div>
      <div
        className={cn(
          "w-11 h-11 mx-3 rounded-full shadow-md shadow-slate-500 text-pink-500",
          checkerColor(),
          point.location === "top" && "mt-1",
          point.location === "bottom" && "mb-1"
        )}
      />
    </div>
  );
}

export function CheckerDraggable({
  point,
  index,
}: {
  point: Point;
  index: number;
}) {
  const { selectChecker, playerColour, white, black, uuid, socket } =
    useGamePlay();

  React.useEffect(() => {
    if (!socket) return;

    socket.on(
      "select-checker",
      ({ senderUuid, point }: SelectedCheckerEmit) => {
        if (!senderUuid || !point) return;
        if (senderUuid && isMe(senderUuid)) return;
        selectChecker(point);
      }
    );
  }, [selectChecker, socket]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: point.pointNumber,
    data: {
      point,
    },
  });

  const checkerColor = () => {
    if (!point.occupiedBy) return "bg-gray-500";

    if (
      ((point.location === "bottom" && index === point.checkerCount) ||
        (point.location === "top" && index === 1)) &&
      point.selected === true &&
      point.occupiedBy.colour === "white"
    )
      return "border-4 border-red-800 bg-white";
    if (
      ((point.location === "bottom" && index === point.checkerCount) ||
        (point.location === "top" && index === 1)) &&
      point.selected === true &&
      point.occupiedBy.colour === "black"
    )
      return "border-4 border-red-800 bg-black";

    if (point.occupiedBy.colour === "white") return "bg-white";

    return "bg-black";
  };

  return (
    <div ref={setNodeRef}>
      <div
        {...listeners}
        {...attributes}
        onClick={(e) => {
          if (playerColour === "white" && white.barCount > 0) return;
          if (playerColour === "black" && black.barCount > 0) return;

          if (
            point.occupiedBy?.colour === playerColour &&
            point.checkerCount > 0
          ) {
            selectChecker(point.pointNumber);

            if (socket) {
              socket.emit("select-checker", {
                senderUuid: uuid,
                point: point.pointNumber,
              } as SelectedCheckerEmit);
            }
          }
        }}
        className={cn(
          "w-11 h-11 mx-3 rounded-full shadow-md shadow-slate-500 text-pink-500",
          checkerColor(),
          point.location === "top" && "mt-1",
          point.location === "bottom" && "mb-1"
        )}
      />
    </div>
  );
}

export function CheckerDrag({ playerColour }: { playerColour: PlayerColour }) {
  return (
    <div
      className={cn(
        "w-11 h-11 rounded-full shadow-md shadow-slate-500 text-pink-500",
        playerColour === "white" && "bg-white",
        playerColour === "black" && "bg-black"
      )}
    />
  );
}

export function CheckerBeared({
  playerColour,
}: {
  playerColour: PlayerColour;
}) {
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-full shadow-md shadow-slate-500",
        playerColour === "white" && "bg-white",
        playerColour === "black" && "bg-black"
      )}
    ></div>
  );
}
