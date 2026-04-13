import { SavedExercise } from "@/src/types/exercisecard";
import { Slot } from "expo-router";
import { useState } from "react";
import { ExerciseContext } from "../contexts/ExerciseContext";
import { WorkoutsContext } from "../contexts/WorkoutsContext";
import { Workout } from "../types/workout";

export default function RootLayout() {
  const [exercises, setExercises] = useState<SavedExercise[]>([]);
  const [workout, setWorkout] = useState<Workout[]>([]);
  return (
    <WorkoutsContext.Provider value={[workout, setWorkout]}>
      <ExerciseContext.Provider value={[exercises, setExercises]}>
        <Slot />
      </ExerciseContext.Provider>
    </WorkoutsContext.Provider>
  );
}
