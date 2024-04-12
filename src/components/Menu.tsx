import { Button } from "./ui/button";
import { useGamePlay } from "@/hooks/useGamePlay";

export default function Menu() {
  const { swopView, resetGame, devAction, uuid, socket } = useGamePlay();

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
          if (socket) socket.emit("reset-game", uuid);
        }}
      >
        Reset
      </Button>

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
