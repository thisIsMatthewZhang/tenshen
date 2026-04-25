import { createContext } from "react";
import { FirebaseFinishedWorkout } from "../types/firebaseFinishedWorkout";

export const FinishedWorkoutsContext = createContext<
  [
    FirebaseFinishedWorkout[],
    React.Dispatch<React.SetStateAction<FirebaseFinishedWorkout[]>>,
  ]
>([[], () => {}]);
