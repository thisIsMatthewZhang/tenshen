import { ExerciseCard } from "./exercisecard";
export type Workout = {
  id: string;
  name: string;
  exercises: ExerciseCard[];
};
