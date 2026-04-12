import { Timestamp } from "firebase/firestore";
import { Workout } from "./workout";

export type SavedWorkout = Workout & {
  savedAt: Timestamp;
};
