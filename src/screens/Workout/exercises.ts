type Exercises = {
  category: string;
  exercises: string[];
};

// NOTE: this is just sample data - categories listed are only the general regions,
// thus, may not account for specific subregions (e.g. Deadlifts should technically cover Glutes but is placed under Legs region)
export const exercises: Exercises[] = [
  { category: "Legs", exercises: ["Squats", "Deadlift (Barbell)"] },
  { category: "Chest", exercises: ["Push-Ups"] },
  { category: "Biceps", exercises: ["Alternating Bicep Curls"] },
  { category: "Abs", exercises: ["Ab Wheel"] },
  { category: "Back", exercises: ["Seated Cable Row - V Grip (Cable)"] },
];

/// Every region:

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
