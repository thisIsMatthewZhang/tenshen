import uuid from "react-native-uuid";
type MuscleGroup =
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
};
export const data: Exercise[] = [
  { id: uuid.v4(), muscleGroup: "Quadriceps", name: "Squats (Barbell)" },
  { id: uuid.v4(), muscleGroup: "Glutes", name: "Deadlift (Barbell)" },
  { id: uuid.v4(), muscleGroup: "Chest", name: "Push Ups" },
  { id: uuid.v4(), muscleGroup: "Biceps", name: "Alternating Bicep Curls" },
  {
    id: uuid.v4(),
    muscleGroup: "Upper Back",
    name: "Seated Cable Row - V Grip (Cable)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Full Body",
    name: "Kettlebell Swing (Kettlebell)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Lats",
    name: "Lat Pulldown (Machine)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Shoulders",
    name: "Arnold Press (Dumbbell)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Triceps",
    name: "Rope Pushdown (Cable Machine)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Biceps",
    name: "Preacher Curl (EZ Bar)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Abdominals",
    name: "Russian Twist (Medicine Ball)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Glutes",
    name: "Hip Thrust (Barbell)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Lower Back",
    name: "Back Extension (Machine)",
  },

  {
    id: uuid.v4(),
    muscleGroup: "Lower Back",
    name: "Back Extension (Machine)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Lower Back",
    name: "Back Extension (Machine)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Lower Back",
    name: "Back Extension (Machine)",
  },
  {
    id: uuid.v4(),
    muscleGroup: "Lower Back",
    name: "Back Extension (Machine)",
  },
];
