import { PropsWithChildren, useState } from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { PATTERN } from "../constants/theme";

enum ExperienceBarConstants {
  EXP_BAR_THRESHOLD_SCALE = 1.5,
  LEVEL_ONE_THRESHOLD = 250,
}

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
  (2) When new level threshold is reached, reset current EXP points to 0 (or add remaining points) and increment level count
  (3) Show animation when new level is reached (and potentially haptic feedback)
  (4) Formula for calculating points earned from workout
*/
export default function ExperienceBar(
  props: PropsWithChildren<ExperienceBarProps>,
) {
  const [userLevel, setUserLevel] = useState(props.userCurrentLevel); // change to context later

  let animationSequence: number[];
  let expBarThreshold =
    userLevel === 1
      ? ExperienceBarConstants.LEVEL_ONE_THRESHOLD
      : userLevel *
        ExperienceBarConstants.EXP_BAR_THRESHOLD_SCALE *
        ExperienceBarConstants.LEVEL_ONE_THRESHOLD;
  const config = {
    duration: 2500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const userExpProgress = useSharedValue(props.userExpProgress); // the user's exp meter width BEFORE width increase animation

  const widthAnimatedStyle = useAnimatedStyle(() => {
    if (userExpProgress.value + props.expGained >= expBarThreshold) {
      const remainingExp =
        props.expGained - (expBarThreshold - userExpProgress.value);
      animationSequence = [
        // NEXT STEP: POPULATE WITH DYNAMIC DATA/ANIMATIONS
        withTiming(userExpProgress.value, config),
        withTiming(userExpProgress.value + props.expGained, config),
        withTiming(0, { duration: 0 }),
        withTiming(remainingExp, config),
      ];
    }
    return {
      width: withSequence(...(animationSequence ?? [])),
    };
  });

  return (
    <View
      style={styles.expBarContainer}
      // onLayout={() => {
      //   userExpProgress.value += props.expGained;

      // }}
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
  return 190;
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
    maxWidth: "100%",
    height: "100%",
    borderRadius: 2.5,
  },
});
