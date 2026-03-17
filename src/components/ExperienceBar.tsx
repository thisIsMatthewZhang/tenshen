import { PropsWithChildren, useState } from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { PATTERN } from "../constants/theme";

export interface ExperienceBarProps {
  expGained: number;
  userExpProgress: number;
  userCurrentLevel: number;
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
  const [userLevel, setUserLevel] = useState(props.userCurrentLevel); // change to context later
  const config = {
    duration: 2500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const userExpProgress = useSharedValue(props.userExpProgress); // the user's exp meter width BEFORE width increase animation
  const widthAnimatedStyle = useAnimatedStyle(() => ({
    width: withDelay(1000, withTiming(userExpProgress.value, config)),
  }));

  return (
    <View
      style={styles.expBarContainer}
      onLayout={() => {
        userExpProgress.value += props.expGained;
      }}
    >
      <Text
        style={[
          PATTERN.smallText,
          { color: props.textColor, fontWeight: "bold" },
        ]}
      >
        Lvl. {userLevel}
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

/**
 * @param id user's id
 * @returns user's experience bar progress
 */
export function getUserExpProgress(id: number): number {
  return 0;
}

/**
 *
 * @param id user's id
 * @returns user's current level
 */
export function getUserCurrentLevel(id: number): number {
  return 1;
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
    borderRadius: 2.5,
  },
  expBar: {
    width: 0,
    maxWidth: "100%",
    height: "100%",
    borderRadius: 2.5,
  },
});
