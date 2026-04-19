import { Equipment } from "./equipment";
import { MuscleGroup } from "./musclegroup";

/**
 * Base type for an Exercise
 */
export type Exercise = {
  readonly id: string;
  readonly name: string;
  readonly primary: MuscleGroup;
  readonly secondary: MuscleGroup | null;
  readonly riveUrl: string;
  readonly equipment: Equipment | null;
};
