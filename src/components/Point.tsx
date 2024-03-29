import React from "react";
import { Checker } from "./Checker";
import { cn } from "@/lib/utils";
import { Point } from "@/lib/interfaces";
import { useGamePlay } from "@/hooks/useGamePlay";

export function PointContainer({ point }: { point: Point }) {
  const { moveChecker, moveCheckerFromBar, selectedBarColour } = useGamePlay();
  const { pointNumber, possibleMove } = point;

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
    checkers.push(<Checker key={i} point={point} index={i + 1} />);
  }

  return (
    <div className="relative w-full h-full">
      <div
        className={`absolute ${
          point.location === "bottom" ? "-bottom-6" : "-top-6"
        } flex flex-col-reverse items-center justify-center w-full font-light text-gray-400 text-xs`}
      >
        {pointNumber}
      </div>

      {/* Triangle Shape */}
      <div
        onClick={() => {
          if (selectedBarColour) {
            moveCheckerFromBar(point);
          } else {
            moveChecker(point);
          }
        }}
        className={cn(
          "w-0 h-0 border-l-[35px] border-r-[35px] border-l-transparent border-r-transparent",
          triangleDirection,
          pointColor
        )}
      />

      {/* Checker Stack */}
      <div
        className={`absolute ${
          point.location === "bottom" ? "bottom-0" : "top-0"
        } flex flex-col-reverse items-center`}
      >
        {checkers}
      </div>
    </div>
  );
}
