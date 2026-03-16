import { PropsWithChildren } from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PATTERN } from "../constants/theme";

export interface ExperienceBarProps {
  expGained: number;
  barColor: ColorValue;
  textColor: ColorValue;
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
  const config = {
    duration: 5000,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const width = useSharedValue(props.expGained);
  const widthAnimatedStyle = useAnimatedStyle(() => ({
    // const widthPerSecond = pointsGained.value / 60; // 60fps
    // return { width: withRepeat(widthPerSecond, 60) }; // kept crashing my app lol
    width: withTiming(width.value, config),
  }));
  return (
    <View style={styles.expBarContainer}>
      <Text
        style={[
          PATTERN.smallText,
          { color: props.textColor, fontWeight: "bold" },
        ]}
      >
        LV. 11
      </Text>
      <View style={styles.expBarBg}>
        <Animated.View
          style={[
            styles.expBar,
            widthAnimatedStyle,
            { backgroundColor: props.barColor },
          ]}
        />
      </View>
    </View>
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

function getLevelThreshold(): number {
  return 0;
}

const styles = StyleSheet.create({
  expBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 12,
  },
  expBarBg: {
    width: "75%",
    height: 10,
    backgroundColor: "grey",
    borderRadius: 5,
  },
  expBar: {
    width: 0,
    height: "100%",
    borderRadius: 5,
  },
});
