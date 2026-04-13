// retrieve this from the database once that is set up

import { createContext } from "react";
import { Workout } from "../types/workout";
// context that is provided from the workout/index parent down to WorkoutCardOptions to allow for workout card editing
export const WorkoutsContext = createContext<
  [Workout[], React.Dispatch<React.SetStateAction<Workout[]>>]
>([[], () => {}]);
