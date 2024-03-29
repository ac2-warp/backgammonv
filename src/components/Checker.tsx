import { useGamePlay } from "@/hooks/useGamePlay";
import { PlayerColour, Point } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

export function Checker({ point, index }: { point: Point; index: number }) {
  const { selectChecker, playerColour, white, black } = useGamePlay();

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
    <div
      onClick={(e) => {
        if (playerColour === "white" && white.barCount > 0) return;
        if (playerColour === "black" && black.barCount > 0) return;

        if (
          point.occupiedBy?.colour === playerColour &&
          point.checkerCount > 0
        ) {
          selectChecker(point.pointNumber);
        }
      }}
      className={cn(
        "w-11 h-11 mx-3 rounded-full shadow-md shadow-slate-500",
        checkerColor(),
        point.location === "top" && "mt-1",
        point.location === "bottom" && "mb-1"
      )}
    ></div>
  );
}

export function CheckerBeared({ playerColour }: { playerColour: PlayerColour }) {
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
