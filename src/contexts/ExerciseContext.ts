import { createContext } from "react";
import { ExerciseCard } from "../types/exercisecard";

export const ExerciseContext = createContext<
  [ExerciseCard[], React.Dispatch<React.SetStateAction<ExerciseCard[]>>]
>([[], () => {}]);
