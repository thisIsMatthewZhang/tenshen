import { ExerciseSetSegmentProps } from "@/src/components/ExerciseCard";
import { Exercise } from "./exercise";

export type ExerciseCard = Exercise & {
  isSelected: boolean;
  sets: ExerciseSetSegmentProps[];
};
