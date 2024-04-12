"use client";
import ButtonsBar from "./ButtonsBar";
import { useGamePlay } from "@/hooks/useGamePlay";
import { PointContainer } from "./Point";
import { PlayersScoreBoard } from "./Dice";
import { ViewBadge } from "./View";
import Bar from "./Bar";
import Loading from "./Loading";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React from "react";
import { CheckerDrag } from "./Checker";
import { Point } from "@/lib/interfaces";
import BareOffHolder from "./Holder";
export default function Board() {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [dragFromPoint, setDragFromPoint] = React.useState<Point | null>(null);
  const { view, points, loading } = useGamePlay();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //px
      },
    })
  );
  // dnd
  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setDragFromPoint(event.active.data.current?.point as Point);
  };

  const onDragEnd = (event: DragEndEvent) => {};

  const onDragOver = (event: DragOverEvent) => {};

  if (loading) return <Loading />;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex flex-col items-center justify-center min-h-screen h-full gap-2 w-full">
        <ButtonsBar />

        <ViewBadge side="top" view={view} />

        <div className="flex items-center justify-center min-w-[1048px] w-[1048px]">
          <PlayersScoreBoard side="left" view={view} />

          <BareOffHolder />

          <div className="relative grid grid-cols-12 w-[1048px] min-w-[1048px] bg-[#007000] border-8 border-[#74452b] gap-x-4 pl-[2px]">
            {points.map((point, index) => (
              <PointContainer key={index} point={point} />
            ))}
            <Bar />
          </div>

          <PlayersScoreBoard side="right" view={view} />
        </div>

        <ViewBadge side="bottom" view={view} />
      </div>

      <DragOverlay>
        {activeId && dragFromPoint?.occupiedBy ? (
          <CheckerDrag playerColour={dragFromPoint?.occupiedBy?.colour} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
