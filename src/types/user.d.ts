import { CollectionReference } from "firebase/firestore";
import { FirebaseWorkout } from "./firebaseworkout";
export type User = {
  name: {
    first: string;
    last: string;
  };
  preferredName: string;
  email: string;
  workoutPartner: string;
  workoutsFinished: CollectionReference | null;
  workoutsSaved: FirebaseWorkout[] | null;
  streak: number;
  exp: number;
  photo?: string;
};
