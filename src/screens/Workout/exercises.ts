import uuid from "react-native-uuid";
import { ExerciseSetSegmentProps } from "./components/ExerciseCard";
export type MuscleGroup =
  | "Quadriceps"
  | "Glutes"
  | "Calves"
  | "Hamstrings"
  | "Abductors"
  | "Adductors"
  | "Upper Back"
  | "Lower Back"
  | "Lats"
  | "Traps"
  | "Neck"
  | "Biceps"
  | "Triceps"
  | "Forearms"
  | "Chest"
  | "Shoulders"
  | "Abdominals"
  | "Full Body";

export type Exercise = {
  id: string;
  muscleGroup: MuscleGroup;
  name: string;
  isSelected: boolean;
  sets: ExerciseSetSegmentProps[];
};
export const data: Exercise[] = [
  {
    id: uuid.v4(),
    muscleGroup: "Quadriceps",
    name: "Squats (Barbell)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Glutes",
    name: "Deadlift (Barbell)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Chest",
    name: "Push Ups",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Biceps",
    name: "Alternating Bicep Curls",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Upper Back",
    name: "Seated Cable Row - V Grip (Cable)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Full Body",
    name: "Kettlebell Swing (Kettlebell)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Lats",
    name: "Lat Pulldown (Machine)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Shoulders",
    name: "Arnold Press (Dumbbell)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Triceps",
    name: "Rope Pushdown (Cable Machine)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Biceps",
    name: "Preacher Curl (EZ Bar)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Abdominals",
    name: "Russian Twist (Medicine Ball)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Glutes",
    name: "Hip Thrust (Barbell)",
    isSelected: false,
    sets: [],
  },
  {
    id: uuid.v4(),
    muscleGroup: "Lower Back",
    name: "Back Extension (Machine)",
    isSelected: false,
    sets: [],
  },
];
