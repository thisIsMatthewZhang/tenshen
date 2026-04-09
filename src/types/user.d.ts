import { CollectionReference } from "firebase/firestore";
export type User = {
  name: {
    first: string;
    last: string;
  };
  preferredName: string;
  email: string;
  workoutPartner: string;
  workoutsFinished: CollectionReference | null;
  workoutsSaved: CollectionReference | null;
  streak: number;
  exp: number;
  photo?: string;
};
