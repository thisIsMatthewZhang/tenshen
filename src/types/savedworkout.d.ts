/**For Firebase */
import { Workout } from "./workout";

export type SavedWorkout = Workout & {
  savedAt: Date;
};
