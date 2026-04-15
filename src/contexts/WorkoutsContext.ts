// retrieve this from the database once that is set up

import { createContext } from "react";
import { Workout } from "../types/workout";

export const WorkoutsContext = createContext<
  [Workout[], React.Dispatch<React.SetStateAction<Workout[]>>]
>([[], () => {}]);
