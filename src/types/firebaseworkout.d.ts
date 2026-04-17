/**For Firebase */
import { Timestamp } from "firebase/firestore";
import { Workout } from "./workout";

export type FirebaseWorkout = Workout & {
  savedAt: Timestamp;
};
