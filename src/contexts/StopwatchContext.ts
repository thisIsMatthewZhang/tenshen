import { createContext } from "react";

export const StopwatchContext = createContext<
  [
    { hr: number; min: number; sec: number },
    React.Dispatch<
      React.SetStateAction<{
        hr: number;
        min: number;
        sec: number;
      }>
    >,
  ]
>([{ hr: 0, min: 0, sec: 0 }, () => {}]);
