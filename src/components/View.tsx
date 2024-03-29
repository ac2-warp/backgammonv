import { View } from "@/lib/interfaces";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useGamePlay } from "@/hooks/useGamePlay";

export function ViewBadge({
  view,
  side,
}: {
  view: View;
  side: "top" | "bottom";
}) {
  return (
    <div
      className={cn(
        "flex flex-col w-full items-center mb-2",
        side === "top" && "mb-2",
        side === "bottom" && "mt-2"
      )}
    >
      {/* top */}
      {view === "WhiteHomeBoard" && side === "top" && (
        <BlackViewBadge view={view} />
      )}
      {view === "BlackHomeBoard" && side === "top" && (
        <WhiteViewBadge view={view} />
      )}
      {/* bottom */}
      {view === "WhiteHomeBoard" && side === "bottom" && (
        <WhiteViewBadge view={view} />
      )}
      {view === "BlackHomeBoard" && side === "bottom" && (
        <BlackViewBadge view={view} />
      )}
    </div>
  );
}

function WhiteViewBadge({ view }: { view: View }) {
  const { playerColour } = useGamePlay();
  return (
    <div className="flex flex-col w-full items-center mb">
      <Badge
        variant={playerColour === "white" ? "default" : "outline"}
        className={cn(playerColour === "white" && "bg-green-500")}
      >
        White Side
      </Badge>
    </div>
  );
}

function BlackViewBadge({ view }: { view: View }) {
  const { playerColour } = useGamePlay();
  return (
    <div className="flex flex-col w-full items-center mb">
      <Badge
        variant={playerColour === "black" ? "default" : "outline"}
        className={cn(playerColour === "black" && "bg-green-500")}
      >
        Black Side
      </Badge>
    </div>
  );
}
