import uuid from "react-native-uuid";
import { WorkoutCardProps } from "./components/WorkoutCard";

export const cardDetails: WorkoutCardProps[] = [
  {
    id: uuid.v4(),
    workoutName: "Pull Day",
    exercises: [
      "Lat Pulldown",
      "Preacher Curl (Barbell)",
      "Cable Face Pull",
      "Rows (Barbell)",
      "Incline Bicep Curl (Dumbbell)",
      "Hammer Curl (Dumbbell)",
    ],
  },
  {
    id: uuid.v4(),
    workoutName: "Legs + Abs",
    exercises: [
      "Squat (Barbell)",
      "Deadlift (Barbell)",
      "Good Morning (Barbell)",
      "Cable Crunch",
    ],
  },
  {
    id: uuid.v4(),
    workoutName: "Legs + Abs",
    exercises: [
      "Squat (Barbell)",
      "Deadlift (Barbell)",
      "Good Morning (Barbell)",
      "Cable Crunch",
    ],
  },
  {
    id: uuid.v4(),
    workoutName: "Legs + Abs",
    exercises: [
      "Squat (Barbell)",
      "Deadlift (Barbell)",
      "Good Morning (Barbell)",
      "Cable Crunch",
    ],
  },
];
