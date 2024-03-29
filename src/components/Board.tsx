"use client";
import ButtonsBar from "./ButtonsBar";
import { useGamePlay } from "@/hooks/useGamePlay";
import { PointContainer } from "./Point";
import Holder from "./Holder";
import { DiceButton } from "./Dice";
import { ViewBadge } from "./View";
import Bar from "./Bar";
import Loading from "./Loading";

export default function Board() {
  const { view, points, loading } = useGamePlay();

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full gap-2 w-full">
      <ButtonsBar />

      <ViewBadge side="top" view={view} />

      <div className="flex items-center justify-center min-w-[1048px] w-[1048px]">
        <DiceButton side="left" view={view} />

        <Holder side="left" />

        <div className="relative grid grid-cols-12 w-[1048px] min-w-[1048px] bg-[#007000] border-8 border-[#74452b] gap-x-4 pl-[2px]">
          {points.map((point, index) => (
            <PointContainer key={index} point={point} />
          ))}
          <Bar />
        </div>

        <Holder side="right" />

        <DiceButton side="right" view={view} />
      </div>

      <ViewBadge side="bottom" view={view} />
    </div>
  );
}
