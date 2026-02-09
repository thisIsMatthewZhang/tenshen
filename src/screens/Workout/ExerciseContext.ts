import { createContext } from "react";

export const ExerciseContext = createContext<
  [
    { id: string; exerciseName: string }[],
    React.Dispatch<
      React.SetStateAction<{ id: string; exerciseName: string }[]>
    >,
  ]
>([[], () => {}]);
