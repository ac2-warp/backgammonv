import { Button } from "./ui/button";
import { useGamePlay } from "@/hooks/useGamePlay";

export default function ButtonsBar() {
  const { swopView, resetGame } = useGamePlay();

  return (
    <div className="w-full flex justify-center gap-2">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          swopView();
        }}
      >
        Change View
      </Button>

      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          resetGame();
        }}
      >
        Reset
      </Button>
    </div>
  );
}
