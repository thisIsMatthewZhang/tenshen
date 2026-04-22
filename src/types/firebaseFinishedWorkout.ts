/**For Firebase */
import { Timestamp } from "firebase/firestore";
import { Workout } from "./workout";

export type FirebaseFinishedWorkout = Workout & {
  finshedAt: Timestamp;
};
