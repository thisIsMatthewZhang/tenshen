import { FONTS, GOLD, PATTERN } from "@/src/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import ExtraOptions from "../../../components/ExtraOptions";
export interface WorkoutCardProps {
  id: number;
  workoutName: string;
  exercises: string[];
}

export default function WorkoutCard({
  id,
  workoutName,
  exercises,
}: WorkoutCardProps) {
  const [buttonHighlight, setButtonColor] = useState<"#56A7FF" | "#002d9f">(
    "#56A7FF",
  );

  return (
    <LinearGradient
      style={styles.card}
      colors={["#FFDF81", "#CC9A06", "#997404"] as const}
      locations={[0.1, 0.5, 0.75] as const}
      dither={false}
    >
      <Text style={styles.workoutName}> {workoutName} </Text>
      <ExtraOptions />
      <Text>{exercises.toString().split(",").join(", ")}</Text>
      <Pressable
        onPressIn={() => {
          setButtonColor("#002d9f");
        }}
        onPressOut={() => {
          setButtonColor("#56A7FF");
        }}
        style={[styles.startButton, { backgroundColor: buttonHighlight }]}
      >
        <Text
          style={[PATTERN.mediumText, { fontWeight: "bold", color: "black" }]}
        >
          Start Workout
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width * 0.9,
    height: 175,
    backgroundColor: GOLD,
    borderRadius: 20,
    margin: 8,
    padding: 12,
  },
  workoutName: {
    fontSize: 24,
    fontWeight: "bold",
    ...FONTS,
  },
  exercises: {
    fontSize: 12,
    fontWeight: "bold",
    ...FONTS,
  },
  startButton: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: "25%",
    borderRadius: 20,
  },
});
