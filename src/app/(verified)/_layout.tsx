import { firebaseConfigWeb } from "@/config/firebaseConfig";
import { ExerciseContext } from "@/src/contexts/ExerciseContext";
import { FinishedWorkoutsContext } from "@/src/contexts/FinishedWorkoutsContext";
import {
  FirebaseAuthProvider
} from "@/src/contexts/FirebaseAuthContext";
import { WorkoutsContext } from "@/src/contexts/WorkoutsContext";
import { ExerciseCard } from "@/src/types/exercisecard";
import { FirebaseFinishedWorkout } from "@/src/types/firebaseFinishedWorkout";
import { FirebaseSavedWorkout } from "@/src/types/firebaseworkout";
import { User as AppUser } from "@/src/types/user";
import { getUserData } from "@/src/utils/getUserData";
import { Slot } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);
const db = getFirestore(app);

export default function VerifiedGroups() {
  const user = auth.currentUser!;
  const isVerified = user.emailVerified;
  const [exercises, setExercises] = useState<ExerciseCard[]>([]);
  const [workouts, setWorkouts] = useState<FirebaseSavedWorkout[]>([]);
  const [finishedWorkouts, setFinishedWorkouts] = useState<
    FirebaseFinishedWorkout[]
  >([]);
  let appUserData: {
    [K in keyof AppUser]?: AppUser[K];
  };
  useEffect(() => {
    async function fetchData() {
      const data = await getUserData(user.uid, db);
      appUserData = { ...data };
      setWorkouts(appUserData.workoutsSaved!);
      setFinishedWorkouts(appUserData.workoutsFinished!.toReversed());
    }
    fetchData();
  }, []);

  return (
    <FirebaseAuthProvider>
      <WorkoutsContext.Provider value={[workouts, setWorkouts]}>
        <FinishedWorkoutsContext.Provider
          value={[finishedWorkouts, setFinishedWorkouts]}
        >
          <ExerciseContext.Provider value={[exercises, setExercises]}>
            <Slot />
          </ExerciseContext.Provider>
        </FinishedWorkoutsContext.Provider>
      </WorkoutsContext.Provider>
    </FirebaseAuthProvider>
  );
}
