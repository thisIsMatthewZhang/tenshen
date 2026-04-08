import { ExerciseSetSegmentProps } from "./components/ExerciseCard";

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
  readonly id: string;
  readonly name: string;
  readonly primary: MuscleGroup;
  readonly secondary: MuscleGroup | null;
  readonly riveUrl: string;
  readonly equipment: string | null;
  readonly isSelected: boolean;
  sets: ExerciseSetSegmentProps[];
};
