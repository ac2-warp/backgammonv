import {
  ChoosePlayerEmit,
  DiceRollEmit,
  PlayerColour,
  View,
} from "@/interfaces";
import { useGamePlay } from "@/hooks/useGamePlay";
import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "./ui/badge";
import { isMe } from "@/lib/isme";

export function PlayersScoreBoard({
  view,
  side,
}: {
  view: View;
  side: "left" | "right";
}) {
  return (
    <div className="m-8 flex flex-col items-center gap-4 w-[100px] min-w-[100px]">
      {/* left */}
      {view === "WhiteHomeBoard" && side === "left" && (
        <BlackPlayerScoreBoard />
      )}
      {view === "BlackHomeBoard" && side === "left" && (
        <WhitePlayerScoreBoard />
      )}
      {/* right */}
      {view === "WhiteHomeBoard" && side === "right" && (
        <WhitePlayerScoreBoard />
      )}
      {view === "BlackHomeBoard" && side === "right" && (
        <BlackPlayerScoreBoard />
      )}
    </div>
  );
}

function WhitePlayerScoreBoard() {
  const { white, iam, setIam, uuid, socket } = useGamePlay();

  return (
    <div className="m-4 flex flex-col items-center gap-2 min-w-32">
      <div className="flex gap-1 text-sm text-muted-foreground">
        <h6>Angie</h6>
        <Badge
          variant="secondary"
          className={cn(
            "hover:cursor-pointer",
            iam === "white" && "bg-green-500"
          )}
          onClick={() => {
            setIam("white");
            localStorage.setItem("iam", "white");
            if (socket) {
              socket.emit("choose-player", {
                senderUuid: uuid,
                iam: "white",
              } as ChoosePlayerEmit);
            }
          }}
        >
          {white.offCount}
        </Badge>
      </div>
      <Dice3D player="white" />
    </div>
  );
}

function BlackPlayerScoreBoard() {
  const { black, iam, setIam, uuid, socket } = useGamePlay();

  return (
    <div className="m-8 flex flex-col items-center    gap-4">
      <div className="flex gap-1 text-sm text-muted-foreground">
        <h6>Alan</h6>
        <Badge
          variant="secondary"
          className={cn(
            "hover:cursor-pointer",
            iam === "black" && "bg-green-500"
          )}
          onClick={() => {
            setIam("black");
            localStorage.setItem("iam", "black");
            if (socket) {
              socket.emit("choose-player", {
                senderUuid: uuid,
                iam: "black",
              } as ChoosePlayerEmit);
            }
          }}
        >
          {black.offCount}
        </Badge>
      </div>
      <Dice3D player="black" />
    </div>
  );
}

export function Dice3D({ player }: { player: PlayerColour }) {
  const { roll, playerColour, dice, setDice, iam, uuid, socket } =
    useGamePlay();

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
    playerColour !== player && "bg-[#f3333]",
    playerColour !== player && "[box-shadow:inset_2px_2px_#cccccc]"
  );

  const dotDisabled = cn(
    "absolute w-[10px] h-[10px] -mt-[5px] mr-[2.5px] mb-[2.5px] -ml-[5px] rounded-[10px] bg-[#f3333] [box-shadow:inset_2px_2px_#cccccc]"
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

  const empty = "flex items-center justify-center h-[50px] w-full";

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
    dice[0] === undefined ? "0" : showDice(dice[0])
  );
  const [showDiceSide2, setShowDiceSide2] = React.useState<string>(
    dice[1] === undefined ? "0" : showDice(dice[1])
  );

  const rollDice = (dice1?: number, dice2?: number, noEmit?: boolean) => {
    if (dice[0] > 0 || dice[1] > 0) return; // don't run if it already contains numbers

    const diceTwo = dice1 || Math.floor(Math.random() * 6) + 1;
    const diceOne = dice2 || Math.floor(Math.random() * 6) + 1;

    if (
      uuid &&
      diceOne &&
      diceTwo &&
      diceOne !== dice[0] &&
      diceTwo !== dice[1] &&
      socket &&
      !noEmit
    ) {
      socket.emit("roll", {
        senderUuid: uuid,
        diceOne,
        diceTwo,
      } as DiceRollEmit); // send to other players
    }
    if (diceOne && diceTwo) roll(diceOne, diceTwo);

    setShowDiceSide1(showDice(diceOne));
    setShowDiceSide2(showDice(diceTwo));
    setDice([diceOne, diceTwo]);

    localStorage.setItem("dice", JSON.stringify([diceOne, diceTwo]));
  };

  // socketio
  React.useEffect(() => {
    if (!socket) return;

    const _rollDice = (dice1?: number, dice2?: number, noEmit?: boolean) => {
      if (dice[0] > 0 || dice[1] > 0) return; // don't run if it already contains numbers

      const diceOne = dice1 || Math.floor(Math.random() * 6) + 1;
      const diceTwo = dice2 || Math.floor(Math.random() * 6) + 1;

      if (
        uuid &&
        diceOne &&
        diceTwo &&
        diceOne !== dice[0] &&
        diceTwo !== dice[1] &&
        socket &&
        !noEmit
      ) {
        socket.emit("roll", {
          senderUuid: uuid,
          diceOne,
          diceTwo,
        } as DiceRollEmit); // send to other players
      }
      if (diceOne && diceTwo) roll(diceOne, diceTwo);

      setShowDiceSide1(showDice(diceOne));
      setShowDiceSide2(showDice(diceTwo));
      setDice([diceOne, diceTwo]);

      localStorage.setItem("dice", JSON.stringify([diceOne, diceTwo]));
    };

    socket.on("roll", ({ senderUuid, diceOne, diceTwo }: DiceRollEmit) => {
      if (!senderUuid) return;
      if (senderUuid && isMe(senderUuid)) return;
      if ((diceOne === 0 && diceTwo === 0) || !diceOne || !diceTwo) return;

      _rollDice(diceOne, diceTwo, true); // roll dice for other player
    });
  }, [dice, roll, setDice, socket, uuid]);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 items-center",
        iam !== player && "hover:cursor-wait",
        iam === player && "hover:cursor-pointer"
      )}
      onClick={() => {
        rollDice();
      }}
    >
      <div className="w-[75px] h-[75px] flex">
        <div className="relative inline-block">
          <div
            id="dice1"
            className={cn(diceObject, diceObject1, showDiceSide1)}
          >
            <div id="dice-one-side-one" className={cn(side, side1)}>
              {player === playerColour && dice[0] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[0] > 0 && (
                <div className={cn(dot, one1, dice[0] === 0 && dotDisabled)} />
              )}
            </div>
            <div id="dice-one-side-two" className={cn(side, side2)}>
              {player === playerColour && dice[0] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[0] > 0 && (
                <>
                  <div
                    className={cn(dot, two1, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, two2, dice[0] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
            <div id="dice-one-side-three" className={cn(side, side3)}>
              {player === playerColour && dice[0] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[0] > 0 && (
                <>
                  <div
                    className={cn(dot, three1, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, three2, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, three3, dice[0] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
            <div id="dice-one-side-four" className={cn(side, side4)}>
              {player === playerColour && dice[0] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[0] > 0 && (
                <>
                  <div
                    className={cn(dot, four1, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, four2, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, four3, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, four4, dice[0] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
            <div id="dice-one-side-five" className={cn(side, side5)}>
              {player === playerColour && dice[0] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[0] > 0 && (
                <>
                  <div
                    className={cn(dot, five1, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, five2, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, five3, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, five4, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, five5, dice[0] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
            <div id="dice-one-side-six" className={cn(side, side6)}>
              {player === playerColour && dice[0] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[0] > 0 && (
                <>
                  <div
                    className={cn(dot, six1, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six2, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six3, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six4, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six5, dice[0] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six6, dice[0] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="relative inline-block">
          <div
            id="dice2"
            className={cn(diceObject, diceObject2, showDiceSide2)}
          >
            <div id="dice-two-side-one" className={cn(side, side1)}>
              {player === playerColour && dice[1] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[1] > 0 && (
                <>
                  <div
                    className={cn(dot, one1, dice[1] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
            <div id="dice-two-side-two" className={cn(side, side2)}>
              {player === playerColour && dice[1] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[1] > 0 && (
                <>
                  <div
                    className={cn(dot, two1, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, two2, dice[1] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
            <div id="dice-two-side-three" className={cn(side, side3)}>
              {player === playerColour && dice[1] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[1] > 0 && (
                <>
                  <div
                    className={cn(dot, three1, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, three2, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, three3, dice[1] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
            <div id="dice-two-side-four" className={cn(side, side4)}>
              {player === playerColour && dice[1] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[1] > 0 && (
                <>
                  <div
                    className={cn(dot, four1, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, four2, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, four3, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, four4, dice[1] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
            <div id="dice-two-side-five" className={cn(side, side5)}>
              {player === playerColour && dice[1] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[1] > 0 && (
                <>
                  <div
                    className={cn(dot, five1, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, five2, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, five3, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, five4, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, five5, dice[1] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
            <div id="dice-two-side-six" className={cn(side, side6)}>
              {player === playerColour && dice[1] === 0 && (
                <div className={cn(empty)}>-</div>
              )}
              {player === playerColour && dice[1] > 0 && (
                <>
                  <div
                    className={cn(dot, six1, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six2, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six3, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six4, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six5, dice[1] === 0 && dotDisabled)}
                  />
                  <div
                    className={cn(dot, six6, dice[1] === 0 && dotDisabled)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
