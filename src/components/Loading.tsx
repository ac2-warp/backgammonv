import { ImSpinner6 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <ImSpinner6 className="h-20 w-20 animate-spin" />
    </div>
  );
}
