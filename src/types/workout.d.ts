/**For client-side logic */
import { ExerciseCard } from "./exercise";
export type Workout = {
  id: string;
  name: string;
  exercises: ExerciseCard[];
};
