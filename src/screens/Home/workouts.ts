// retrieve this from the database once that is set up
import { WorkoutCardProps } from "./components/WorkoutCard";

export const cardDetails: WorkoutCardProps[] = [
  { workoutName: "Pull Day", exercises: [] },
  {
    workoutName: "Legs + Abs",
    exercises: [
      "Squat (Barbell)",
      "Deadlift (Barbell)",
      "Good Morning (Barbell)",
      "Cable Crunch",
    ],
  },
];
