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
  | "Abdominals";

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
];

/// Every muscle group:

// Quadriceps
// Glutes
// Calves
// Hamstrings
// Abductors (omit for beta)
// Adductors (omit for beta)

// Upper Back
// Lower Back
// Lats
// Traps
// Neck (omit for beta)

// Biceps
// Triceps
// Forearms

// Chest
// Shoulders

// Abdominals

// Could add running (for cardio)
