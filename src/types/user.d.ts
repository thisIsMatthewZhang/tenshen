import { CollectionReference } from "firebase/firestore";
import { Workout } from "./workout";
export type User = {
  name: {
    first: string;
    last: string;
  };
  preferredName: string;
  email: string;
  workoutPartner: string;
  workoutsFinished: CollectionReference | null;
  workoutsSaved: Workout[] | null;
  streak: number;
  exp: number;
  photo?: string;
};
