// retrieve this from the database once that is set up

import { createContext } from "react";
import { WorkoutCardProps } from "../components/WorkoutCard";
// context that is provided from the workout/index parent down to WorkoutCardOptions to allow for workout card editing
export const WorkoutsContext = createContext<
  [WorkoutCardProps[], React.Dispatch<React.SetStateAction<WorkoutCardProps[]>>]
>([[], () => {}]);
