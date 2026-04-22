/**For Firebase */
import { Timestamp } from "firebase/firestore";
import { Workout } from "./workout";

type Time = `${number}hr ${number}m ${number}s`;

export type FirebaseFinishedWorkout = Workout & {
  duration: Time;
  finshedAt: Timestamp;
};
