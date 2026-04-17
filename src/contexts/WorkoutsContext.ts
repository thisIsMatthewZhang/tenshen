// retrieve this from the database once that is set up

import { createContext } from "react";
import { FirebaseWorkout } from "../types/firebaseworkout";

export const WorkoutsContext = createContext<
  [FirebaseWorkout[], React.Dispatch<React.SetStateAction<FirebaseWorkout[]>>]
>([[], () => {}]);
