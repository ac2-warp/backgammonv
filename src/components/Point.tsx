import React from "react";
import { Checker, CheckerDraggable } from "./Checker";
import { cn } from "@/lib/utils";
import { Point } from "@/interfaces";
import { useGamePlay } from "@/hooks/useGamePlay";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";

export function PointContainer({ point }: { point: Point }) {
  const {
    moveChecker,
    moveToBar,
    selectedBarColour,
    possibleMoves,
    whiteBoardView,
    blackBoardView,
    uuid,
    socket,
  } = useGamePlay();
  const { pointNumber, possibleMove } = point;

  const droppable = useDroppable({
    id: pointNumber,
    data: {
      point,
    },
  });

  const isLight = pointNumber % 2 === 0;

  const pointColor = React.useMemo(() => {
    if (possibleMove) {
      if (point.location === "top") return "border-t-yellow-400";
      if (point.location === "bottom") return "border-b-yellow-400";
    }

    if (!possibleMove) {
      if (isLight && point.location === "bottom") return "border-t-red-500";
      if (isLight && point.location === "top") return "border-b-red-500";
      if (!isLight && point.location === "top") return "border-t-red-500";
      if (!isLight && point.location === "bottom") return "border-b-red-500";
    }
  }, [isLight, point, possibleMove]);

  const triangleDirection =
    point.location === "bottom" ? "border-b-[292px]" : "border-t-[292px]";

  // Generate checker stack
  const checkers = [];
  for (let i = 0; i < point.checkerCount; i++) {
    if (i === 0 && point.location === "top") {
      checkers.push(<CheckerDraggable key={i} point={point} index={i + 1} />);
    } else if (i === point.checkerCount - 1 && point.location === "bottom") {
      checkers.push(<CheckerDraggable key={i} point={point} index={i + 1} />);
    } else {
      checkers.push(<Checker key={i} point={point} index={i + 1} />);
    }
  }

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const toPoint: Point = event.over?.data.current?.point as Point;
      moveChecker(toPoint);
    },
  });

  return (
    <div className="relative w-full h-full" ref={droppable.setNodeRef}>
      <div
        className={`absolute ${
          point.location === "bottom" ? "-bottom-6" : "-top-6"
        } flex flex-col items-center justify-center w-full font-light text-gray-400 text-xs`}
      >
        {pointNumber}
      </div>

      {/* Triangle Shape */}
      <div
        onClick={() => {
          if (selectedBarColour) {
            moveToBar(point);
          } else {
            moveChecker(point);

            if (socket) {
              socket.emit("move", {
                senderUuid: uuid,
                whiteBoardView,
                blackBoardView,
              });
            }
          }
        }}
        className={cn(
          "w-0 h-0 border-l-[35px] border-r-[35px] border-l-transparent border-r-transparent",
          triangleDirection,
          pointColor,
          droppable.isOver &&
            point.location === "top" &&
            possibleMoves.includes(point.pointNumber) &&
            "border-t-pink-500 cursor-pointer",
          droppable.isOver &&
            point.location === "bottom" &&
            possibleMoves.includes(point.pointNumber) &&
            "border-b-pink-500 cursor-pointer"
        )}
      />

      {/* Checker Stack */}
      <div
        className={cn(
          "absolute flex flex-col-reverse items-center",
          point.location === "bottom" ? "bottom-0" : "top-0"
        )}
      >
        {checkers}
      </div>
    </div>
  );
}
