import { View } from "@/lib/interfaces";
import { Button } from "./ui/button";
import { useGamePlay } from "@/hooks/useGamePlay";

export function DiceButton({
  view,
  side,
}: {
  view: View;
  side: "left" | "right";
}) {
  return (
    <div className="m-8 flex flex-col items-center gap-4 w-[100px] min-w-[100px]">
      {/* left */}
      {view === "WhiteHomeBoard" && side === "left" && <BlackDiceButton />}
      {view === "BlackHomeBoard" && side === "left" && <WhiteDiceButton />}
      {/* right */}
      {view === "WhiteHomeBoard" && side === "right" && <WhiteDiceButton />}
      {view === "BlackHomeBoard" && side === "right" && <BlackDiceButton />}
    </div>
  );
}

function WhiteDiceButton() {
  const { roll, dice, playerColour } = useGamePlay();

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <h6>White</h6>
      <Button
        size="sm"
        disabled={playerColour !== "white"}
        onClick={() => {
          roll();
        }}
      >
        {`Roll Dice (${dice[0]} + ${dice[1]})`}
      </Button>
    </div>
  );
}

function BlackDiceButton() {
  const { roll, dice, playerColour } = useGamePlay();

  return (
    <div className="m-8 flex flex-col items-center    gap-4">
      <h6>Black</h6>

      <Button
        size="sm"
        disabled={playerColour !== "black"}
        onClick={() => {
          roll();
        }}
      >
        {`Roll Dice (${dice[0]} + ${dice[1]})`}
      </Button>
    </div>
  );
}
