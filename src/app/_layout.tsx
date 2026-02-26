import { Slot } from "expo-router";
import { useState } from "react";
import { WorkoutCardProps } from "../components/WorkoutCard";
import { ExerciseContext } from "../contexts/ExerciseContext";
import { WorkoutsContext } from "../contexts/WorkoutsContext";
import { Exercise } from "../utils/exercises";

export default function RootLayout() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workout, setWorkout] = useState<WorkoutCardProps[]>([]);
  return (
    <WorkoutsContext.Provider value={[workout, setWorkout]}>
      <ExerciseContext.Provider value={[exercises, setExercises]}>
        <Slot />
      </ExerciseContext.Provider>
    </WorkoutsContext.Provider>
  );
}
