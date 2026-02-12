import Button from "@/src/components/Button";
import ReusableModal from "@/src/components/ReusableModal";
import {
  BLUE_DARKER,
  BLUE_LIGHTER,
  FONTS,
  GOLD,
  PATTERN,
} from "@/src/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import { Exercise } from "../exercises";
import WorkoutCardOptions from "./WorkoutCardOptions";
export interface WorkoutCardProps {
  id: string;
  workoutName: string;
  exercises: Exercise[];
}

export default function WorkoutCard({
  id,
  workoutName,
  exercises,
}: WorkoutCardProps) {
  const [buttonHighlight, setButtonColor] = useState<
    typeof BLUE_LIGHTER | typeof BLUE_DARKER
  >(BLUE_LIGHTER);
  const [showWorkoutOverview, setShowWorkoutOverview] =
    useState<boolean>(false);

  return (
    <>
      <LinearGradient
        style={styles.card}
        colors={["#FFDF81", "#CC9A06", "#997404"] as const}
        locations={[0.1, 0.5, 0.75] as const}
        dither={false}
      >
        <Text style={styles.workoutName}>{workoutName}</Text>
        <WorkoutCardOptions
          id={id}
          workoutName={workoutName}
          exercises={exercises}
        />
        <Text numberOfLines={2}>
          {exercises
            .map((item) => item.name)
            .toString()
            .split(",")
            .join(", ")}
        </Text>
        <Pressable
          onPressIn={() => {
            setButtonColor(BLUE_DARKER);
          }}
          onPressOut={() => {
            setButtonColor(BLUE_LIGHTER);
          }}
          onPress={() => {
            setShowWorkoutOverview(!setShowWorkoutOverview);
          }}
          style={[styles.startButton, { backgroundColor: buttonHighlight }]}
        >
          <Text
            style={[PATTERN.mediumText, { fontWeight: 600, color: "black" }]}
          >
            Start Workout
          </Text>
        </Pressable>
      </LinearGradient>
      {showWorkoutOverview ? (
        <ReusableModal
          showModal={showWorkoutOverview}
          setShowModal={setShowWorkoutOverview}
        >
          <Button
            title="Let's get started!"
            bgColor={GOLD}
            textColor={"black"}
            onPress={() => {}}
            style={{ width: "90%" }}
          />
        </ReusableModal>
      ) : (
        <></>
      )}
    </>
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
});
