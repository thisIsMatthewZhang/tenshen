import { ExerciseSetSegmentProps } from "@/src/components/ExerciseCard";
import { Equipment } from "./equipment";
import { MuscleGroup } from "./musclegroup";

export type Exercise = {
  readonly id: string;
  readonly name: string;
  readonly primary: MuscleGroup;
  readonly secondary: MuscleGroup | null;
  readonly riveUrl: string;
  readonly equipment: Equipment | null;
  isSelected: boolean;
  sets: ExerciseSetSegmentProps[];
};
