import { createContext } from "react";
import { Exercise } from "../utils/exercises";

export const ExerciseContext = createContext<
  [Exercise[], React.Dispatch<React.SetStateAction<Exercise[]>>]
>([[], () => {}]);
