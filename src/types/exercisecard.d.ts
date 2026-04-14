import { ExerciseSetSegmentProps } from "@/src/components/ExerciseCard";
import { Exercise } from "./exercise";

/**Type used during client-side workout building */
export type ExerciseCard = Exercise & {
  isSelected: boolean;
  sets: ExerciseSetSegmentProps[];
};
