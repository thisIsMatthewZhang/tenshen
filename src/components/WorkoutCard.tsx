import AppButton from "@/src/components/AppButton";
import ReusableModal from "@/src/components/ReusableModal";
import {
  BLUE_DARKER,
  BLUE_LIGHTER,
  FONTS,
  MAIN_COLOR,
  PATTERN,
} from "@/src/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Exercise } from "../utils/exercises";
import WorkoutCardOptions from "./WorkoutCardOptions";
import WorkoutOverviewCard from "./WorkoutOverviewCard";
// const ruby = require("../../../../assets/avatars/Ruby.png");
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
  const router = useRouter();

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
            setShowWorkoutOverview(true);
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
          <View style={styles.headerContainer}>
            <AppButton
              title="Cancel"
              bgColor="red"
              textColor="black"
              onPress={() => {
                setShowWorkoutOverview(false);
              }}
              style={{ margin: 8 }}
            />
            <Text style={[PATTERN.mediumText, { fontWeight: "bold" }]}>
              Here&apos;s your workout
            </Text>
            <AppButton
              title="Start 👍"
              bgColor={BLUE_LIGHTER}
              textColor="white"
              onPress={() => {
                setShowWorkoutOverview(false);

                // in this moment, 'workoutName' would be passed as a *query parameter* (/workout/session/workoutId/exerciseIndex?workoutName=workoutName)
                router.navigate({
                  pathname: "/session/[workoutId]",
                  params: {
                    workoutId: id,
                    workoutName: workoutName,
                    exerciseIndex: "0",
                    setIndex: "1",
                  },
                });
              }}
              style={{ margin: 8 }}
            />
          </View>
          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <View style={styles.overviewSection}>
                <WorkoutOverviewCard
                  id={item.id}
                  name={item.name}
                  muscleGroup={item.muscleGroup}
                  isSelected
                  sets={item.sets}
                />
                {/* Place avatar here... */}
                {/* <Image source={ruby} style={{ width: 150, height: 150 }} /> */}
              </View>
            )}
            showsVerticalScrollIndicator={false}
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
    backgroundColor: MAIN_COLOR,
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
  overviewSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
  },
  footerContainer: {
    width: "100%",
    backgroundColor: undefined,
    alignItems: "center",
    marginBottom: 28,
  },
});
