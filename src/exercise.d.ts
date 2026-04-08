import { ExerciseSetSegmentProps } from "./components/ExerciseCard";
import { Equipment } from "./equipment";
import { MuscleGroup } from "./musclegroup";

export type Exercise = {
  readonly id: string;
  readonly name: string;
  readonly primary: MuscleGroup;
  readonly secondary: MuscleGroup | null;
  readonly riveUrl: string;
  readonly equipment: Equipment | null;
  readonly isSelected: boolean;
  sets: ExerciseSetSegmentProps[];
};
