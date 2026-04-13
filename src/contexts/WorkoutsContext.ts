// retrieve this from the database once that is set up

import { firebaseConfigWeb } from "@/config/firebaseConfig";
import { User as AppUser } from "@/src/types/user";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore
} from "firebase/firestore";
import { createContext } from "react";
import { getUserData } from "../app/(tabs)/profile";
import { Workout } from "../types/workout";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);
const db = getFirestore(app);
let appUserData: {
  [K in keyof AppUser]?: AppUser[K];
} = {};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await getUserData(user.uid, db);
    appUserData = { ...userData };
  }
});
export const WorkoutsContext = createContext<
  [Workout[], React.Dispatch<React.SetStateAction<Workout[]>>]
>([appUserData?.workoutsSaved ?? [], () => {}]);
