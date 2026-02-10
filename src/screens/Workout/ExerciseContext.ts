import { createContext } from "react";
import { Exercise } from "./exercises";

export const ExerciseContext = createContext<
  [Exercise[], React.Dispatch<React.SetStateAction<Exercise[]>>]
>([[], () => {}]);
