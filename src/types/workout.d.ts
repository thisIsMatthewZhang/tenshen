import { Exercise } from "./exercise";

export type Workout = {
  id: string;
  name: string;
  exercises: Exercise[];
};
