import { useGamePlay } from "@/hooks/useGamePlay";
import { cn } from "@/lib/utils";
import { CheckerBeared } from "./Checker";

export default function BareOffHolder() {
  const { white, black, moveBareOff } = useGamePlay();

  return (
    <div
      className={cn(
        "relative flex flex-col w-[100px] min-w-[100px] h-[600px] bg-[#007000] border-8 border-[#74452b] justify-center border-r-0"
      )}
    >
      <div
        className={cn(
          "grid grid-cols-2 h-[295px] bg-[#3aa63a] p-2 z-50",
          white.canBareOff && "bg-yellow-400 cursor-pointer"
        )}
        onClick={() => {
          moveBareOff();
        }}
      >
        {Array.from({ length: white.offCount }, (_, index) => (
          <CheckerBeared key={index} playerColour="white" />
        ))}
      </div>

      <div
        id="holder-divider"
        className="absolute w-[92px] min-w-[92px] top-[290px] border-4 border-[#74452b]"
      />

      <div
        className={cn(
          "grid grid-cols-2 h-[295px] bg-[#3aa63a] p-2",
          black.canBareOff && "bg-yellow-400"
        )}
        onClick={() => {
          moveBareOff();
        }}
      >
        {Array.from({ length: black.offCount }, (_, index) => (
          <CheckerBeared key={index} playerColour="black" />
        ))}
      </div>
    </div>
  );
}
