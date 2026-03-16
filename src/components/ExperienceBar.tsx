import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

export interface ExperienceBarProps {
  expGained: number;
}
/*
  Requirements for functional EXP bar:
  (1) Scale EXP point threshold based on current level (e.g. 1 -> 2: 50 points; 2 -> 3: 80 points; 3 -> 4: 128 points if using scale of 1.6)
  (2) When new level threshold is reached, reset current EXP points to 0 and increment level count
  (3) Show animation when new level is reached (and potentially haptic feedback)
  (4) Formula for calculating points earned from workout
*/
export default function ExperienceBar(
  props: PropsWithChildren<ExperienceBarProps>,
) {
  return (
    <Animated.View style={styles.expBarContainer}>
      {props.children}
    </Animated.View>
  );
}

/**
 *
 * @param scale number to scale factors by (default is 1.5)
 * @param factors record of values that will be factored into the final calculation (should be specified by the parent)
 * @returns a number that represents total points earned
 */
export function calculateExpPointsEarned(
  factors: Record<string, unknown>,
  scale: number = 1.5,
): number {
  let pointsEarned: number = 0;
  for (let [k, v] of Object.entries(factors)) {
    const factorValue = Number(v);
    if (isNaN(factorValue)) {
      throw new TypeError(
        `Factor format not accounted for. A custom implementation to calculate this entry is required: { ${k}: ${v} }`,
      );
    }
    pointsEarned += factorValue * scale;
  }
  return Math.floor(pointsEarned);
}

const styles = StyleSheet.create({
  expBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 12,
  },
});
