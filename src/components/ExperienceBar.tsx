import { PropsWithChildren, useState } from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
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

export default function ExperienceBar(
  props: PropsWithChildren<ExperienceBarProps>,
) {
  const [userLevel, setUserLevel] = useState(props.userCurrentLevel); // change to context later

  let expBarThreshold =
    userLevel === 1
      ? ExperienceBarConstants.LEVEL_ONE_THRESHOLD
      : userLevel *
        ExperienceBarConstants.EXP_BAR_THRESHOLD_SCALE *
        ExperienceBarConstants.LEVEL_ONE_THRESHOLD;
  const config = {
    duration: 2000,
    easing: Easing.bezier(0.5, 0.01, 0, 1), //
  };
  const userExpProgress = useSharedValue(props.userExpProgress); // the user's exp meter width BEFORE width increase animation

  const widthAnimatedStyle = useAnimatedStyle(() => {
    const newLevelReached =
      userExpProgress.value + props.expGained >= expBarThreshold;
    let animationSequence = [
      withTiming(userExpProgress.value, config),
      withTiming(
        userExpProgress.value + props.expGained,
        config,
        (finished) => {
          if (newLevelReached && finished) {
            scheduleOnRN(setUserLevel, (prev) => prev + 1); // call non-worklet from inside workletized environment
            userExpProgress.set(0);
          }
        },
      ),
      newLevelReached
        ? [
            withTiming(userExpProgress.value, { duration: 0 }),
            withTiming(
              props.expGained - (expBarThreshold - userExpProgress.value),
              config,
            ),
          ]
        : [],
    ];

    return {
      width: withSequence(...animationSequence.flat()),
    };
  });

  return (
    <View style={styles.expBarContainer}>
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
