import { useGamePlay } from "@/hooks/useGamePlay";
import { cn } from "@/lib/utils";

export default function Bar() {
  const { view, white, black, selectBar, selectedPoint, selectedBarColour } =
    useGamePlay();

  const whiteBar = () => {
    for (let x: number = 0; x < white.barCount; x++) {
      return (
        <div
          key={`white-${x}`}
          className={cn(
            "w-10 h-10 mx-3 mb-1 rounded-full shadow-md shadow-slate-500",
            "bg-white",
            selectedBarColour === "white" && "border-4 border-red-800 bg-white"
          )}
          onClick={() => {
            selectBar(white);
          }}
        />
      );
    }
  };

  const blackBar = () => {
    for (let x: number = 0; x < black.barCount; x++) {
      return (
        <div
          key={`black-${x}`}
          className={cn(
            "w-6 h-6 mx-3 mb-1 rounded-full shadow-md shadow-slate-500",
            "bg-black",
            selectedBarColour === "white" && "border-4 border-red-800 bg-black"
          )}
          onClick={() => {
            selectBar(black);
          }}
        />
      );
    }
  };

  if (view === "WhiteHomeBoard")
    return (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[10px] h-[585px] bg-[#74452b] flex flex-col items-center justify-center">
        {whiteBar()}
        {blackBar()}
      </div>
    );

  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[10px] h-[585px] bg-[#74452b] flex flex-col items-center justify-center">
      {blackBar()}
      {whiteBar()}
    </div>
  );
}
