import { PlayerColour, View } from "@/lib/interfaces";
import { Button } from "./ui/button";
import { useGamePlay } from "@/hooks/useGamePlay";
import { cn } from "@/lib/utils";
import React from "react";

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
  const { white, roll, dice, playerColour, devAction } = useGamePlay();

  return (
    <div className="m-4 flex flex-col items-center gap-2 min-w-32">
      <h6>Angie</h6>
      <Dice3D player="white" />

      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        <span>{`Can bare off: ${white.homeCount}`}</span>
        <span>{`Bared off: ${white.offCount}`}</span>
        <span>{`On bar: ${white.barCount}`}</span>
      </div>

      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          devAction();
        }}
      >
        Bear Off Setup
      </Button>
    </div>
  );
}

function BlackDiceButton() {
  const { black, roll, dice, playerColour } = useGamePlay();

  return (
    <div className="m-8 flex flex-col items-center    gap-4">
      <h6>Alan</h6>
      <Dice3D player="black" />

      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        <span>{`Can bare off: ${black.homeCount}`}</span>
        <span>{`Bared off: ${black.offCount}`}</span>
        <span>{`On bar: ${black.barCount}`}</span>
      </div>
    </div>
  );
}

export function Dice3D({ player }: { player: PlayerColour }) {
  const { roll, playerColour, dice } = useGamePlay();

  const diceObject =
    "relative w-[50px] h-[50px] [transform-style:preserve-3d] [transition:transform_2s]";
  const diceObject1 = "absolute -left-[25px]";
  const diceObject2 = "absolute left-[50px]";

  const dot = cn(
    "absolute w-[10px] h-[10px] -mt-[5px] mr-[2.5px] mb-[2.5px] -ml-[5px] rounded-[10px]",
    // enabled
    playerColour === player && "bg-[#f25f5c]",
    playerColour === player && "[box-shadow:inset_2px_2px_#d90429]",
    // disabled
    playerColour !== player && dice[0] === 0 && "bg-[#f3333]",
    playerColour !== player && "[box-shadow:inset_2px_2px_#cccccc]"
  );

  const one1 = "top-[50%] left-[50%]";
  const two1 = "top-[20%] left-[20%]";
  const two2 = "top-[80%] left-[80%]";
  const three1 = "top-[20%] left-[20%]";
  const three2 = "top-[50%] left-[50%]";
  const three3 = "top-[80%] left-[80%]";
  const four1 = "top-[20%] left-[20%]";
  const four2 = "top-[80%] left-[20%]";
  const four3 = "top-[20%] left-[80%]";
  const four4 = "top-[80%] left-[80%]";
  const five1 = "top-[20%] left-[20%]";
  const five2 = "top-[80%] left-[20%]";
  const five3 = "top-[20%] left-[80%]";
  const five4 = "top-[80%] left-[80%]";
  const five5 = "top-[50%] left-[50%]";

  const six1 = "top-[20%] left-[20%]";
  const six2 = "top-[50%] left-[20%]";
  const six3 = "top-[80%] left-[20%]";
  const six4 = "top-[20%] left-[80%]";
  const six5 = "top-[50%] left-[80%]";
  const six6 = "top-[80%] left-[80%]";

  const side =
    "absolute bg-[#ffF] rounded-[2px] w-[50px] h-[50px] border-[1px] border-[solid] border-[#e5e5e5] text-center leading-[1em]";

  const side1 = "[transform:translateZ(1.5em)]";
  const side2 = "[transform:rotateY(-180deg)_translateZ(1.5em)]";
  const side3 = "[transform:rotateY(-90deg)_translateZ(1.5em)]";
  const side4 = "[transform:rotateX(90deg)_translateZ(1.5em)]";
  const side5 = "[transform:rotateX(-90deg)_translateZ(1.5em)]";
  const side6 = "[transform:rotateY(90deg)_translateZ(1.5em)]";

  const show1 = "[transform:rotateX(720deg)_rotateZ(-720deg)]";
  const show2 = "[transform:rotateX(-900deg)_rotateZ(1080deg)]";
  const show3 = "[transform:rotateY(810deg)_rotateZ(720deg)]";
  const show4 = "[transform:rotateX(-810deg)_rotateZ(-1080deg)]";
  const show5 = "[transform:rotateX(450deg)_rotateZ(-720deg)]";
  const show6 = "[transform:rotateY(-450deg)_rotateZ(-1440deg)]";

  const showDice = (side: number) => {
    switch (side) {
      case 1:
        return show1;
      case 2:
        return show2;
      case 3:
        return show3;
      case 4:
        return show4;
      case 5:
        return show5;
      case 6:
        return show6;

      default:
        return show1;
    }
  };

  const [showDiceSide1, setShowDiceSide1] = React.useState<string>(
    showDice(dice[0])
  );
  const [showDiceSide2, setShowDiceSide2] = React.useState<string>(
    showDice(dice[1])
  );

  const rollDice = () => {
    if (player !== playerColour) return; // only roll when current player is passed player

    const diceTwo = Math.floor(Math.random() * 6) + 1;
    const diceOne = Math.floor(Math.random() * 6) + 1;

    setShowDiceSide1(showDice(diceOne));
    setShowDiceSide2(showDice(diceTwo));
    roll(diceOne, diceTwo);
  };

  return (
    <div className="flex flex-col gap-4 items-center" onClick={rollDice}>
      <div className="w-[75px] h-[75px] flex">
        <div className="relative inline-block">
          <div
            id="dice1"
            className={cn(diceObject, diceObject1, showDiceSide1)}
          >
            <div id="dice-one-side-one" className={cn(side, side1)}>
              <div className={cn(dot, one1)} />
            </div>
            <div id="dice-one-side-two" className={cn(side, side2)}>
              <div className={cn(dot, two1)} />
              <div className={cn(dot, two2)} />
            </div>
            <div id="dice-one-side-three" className={cn(side, side3)}>
              <div className={cn(dot, three1)} />
              <div className={cn(dot, three2)} />
              <div className={cn(dot, three3)} />
            </div>
            <div id="dice-one-side-four" className={cn(side, side4)}>
              <div className={cn(dot, four1)} />
              <div className={cn(dot, four2)} />
              <div className={cn(dot, four3)} />
              <div className={cn(dot, four4)} />
            </div>
            <div id="dice-one-side-five" className={cn(side, side5)}>
              <div className={cn(dot, five1)} />
              <div className={cn(dot, five2)} />
              <div className={cn(dot, five3)} />
              <div className={cn(dot, five4)} />
              <div className={cn(dot, five5)} />
            </div>
            <div id="dice-one-side-six" className={cn(side, side6)}>
              <div className={cn(dot, six1)} />
              <div className={cn(dot, six2)} />
              <div className={cn(dot, six3)} />
              <div className={cn(dot, six4)} />
              <div className={cn(dot, six5)} />
              <div className={cn(dot, six6)} />
            </div>
          </div>
        </div>
        <div className="relative inline-block">
          <div
            id="dice2"
            className={cn(diceObject, diceObject2, showDiceSide2)}
          >
            <div id="dice-two-side-one" className={cn(side, side1)}>
              <div className={cn(dot, one1)} />
            </div>
            <div id="dice-two-side-two" className={cn(side, side2)}>
              <div className={cn(dot, two1)} />
              <div className={cn(dot, two2)} />
            </div>
            <div id="dice-two-side-three" className={cn(side, side3)}>
              <div className={cn(dot, three1)} />
              <div className={cn(dot, three2)} />
              <div className={cn(dot, three3)} />
            </div>
            <div id="dice-two-side-four" className={cn(side, side4)}>
              <div className={cn(dot, four1)} />
              <div className={cn(dot, four2)} />
              <div className={cn(dot, four3)} />
              <div className={cn(dot, four4)} />
            </div>
            <div id="dice-two-side-five" className={cn(side, side5)}>
              <div className={cn(dot, five1)} />
              <div className={cn(dot, five2)} />
              <div className={cn(dot, five3)} />
              <div className={cn(dot, five4)} />
              <div className={cn(dot, five5)} />
            </div>
            <div id="dice-two-side-six" className={cn(side, side6)}>
              <div className={cn(dot, six1)} />
              <div className={cn(dot, six2)} />
              <div className={cn(dot, six3)} />
              <div className={cn(dot, six4)} />
              <div className={cn(dot, six5)} />
              <div className={cn(dot, six6)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
