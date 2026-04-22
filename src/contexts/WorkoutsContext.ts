// retrieve this from the database once that is set up

import { createContext } from "react";
import { FirebaseSavedWorkout } from "../types/firebaseworkout";

export const WorkoutsContext = createContext<
  [
    FirebaseSavedWorkout[],
    React.Dispatch<React.SetStateAction<FirebaseSavedWorkout[]>>,
  ]
>([[], () => {}]);
