import { ExerciseSetSegmentProps } from "../components/ExerciseCard";
import { Exercise } from "./exercise";
/**
 * Subtype of Exercise used for storing workouts into Firebase docs.
 * Since FB, does not accept functions as valid field types, we must omit those props
 */
export type FirebaseExercise = Exercise & {
  sets: Omit<ExerciseSetSegmentProps, "onUpdate" | "onDelete">[];
};
