import { FirebaseFinishedWorkout } from "./firebaseFinishedWorkout";
import { FirebaseSavedWorkout } from "./firebaseworkout";
export type User = {
  name: {
    first: string;
    last: string;
  };
  preferredName: string;
  email: string;
  workoutPartner: string;
  workoutsFinished: FirebaseFinishedWorkout[] | null;
  workoutsSaved: FirebaseSavedWorkout[] | null;
  streak: number;
  exp: number;
  photo?: string;
};
