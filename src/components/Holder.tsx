import { cn } from "@/lib/utils";

export default function Holder({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "relative flex w-[100px] min-w-[100px] h-[600px] bg-[#007000] border-8 border-[#74452b] shadow-inner shadow-black justify-center",
        side === "right" && "border-l-0",
        side === "left" && "border-r-0"
      )}
    >
      <div className="grid grid-cols-2 gap-1 max-h-[300px] ">
        {/* <CheckerBeared playerColour="white" /> */}
      </div>
      <div className="absolute w-[92px] min-w-[92px] top-[280px] border-8 border-[#74452b]" />
    </div>
  );
}
