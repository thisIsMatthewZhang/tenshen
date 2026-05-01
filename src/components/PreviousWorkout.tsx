// Parent component for a user's completed workout on the Home page
// Will display all DoneExercise components for a given workout, with a max display of 3
import FinishedExercise from "@/src/components/FinishedExercise";
import PressableText from "@/src/components/PressableText";
import ProfilePhoto from "@/src/components/ProfilePhoto";
import ReusableModal from "@/src/components/ReusableModal";
import {
  APP_BACKGROUND_COLOR,
  BG_CONTRAST,
  BLUE_DARKER,
  BLUE_LIGHTER,
  MAIN_COLOR,
  PATTERN,
} from "@/src/constants/theme";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FirebaseExercise } from "../types/firebaseexercise";
import { FirebaseFinishedWorkout } from "../types/firebaseFinishedWorkout";
import AppButton from "./AppButton";

const MAX_EXERCISES = 3;

export default function PreviousWorkout({
  userName,
  workout,
}: {
  workout: FirebaseFinishedWorkout;
  userName: string;
}) {
  const exercises = workout.exercises;
  const displayedExercises = exercises.slice(0, MAX_EXERCISES);
  const [showFullView, setShowFullView] = useState(false);

  return (
    <>
      <ReusableModal
        showModal={showFullView}
        setShowModal={setShowFullView}
        modalProps={{ animationType: "slide", allowSwipeDismissal: true }}
      >
        <View style={styles.fullViewContainer}>
          <View style={styles.topButtonsContainer}>
            <AppButton
              title="Done"
              bgColor={BLUE_LIGHTER}
              textColor={"white"}
              onPress={() => setShowFullView(false)}
              customStyle={({ pressed }) => ({
                width: 75,
                backgroundColor: pressed ? BLUE_DARKER : BLUE_LIGHTER,
              })}
            />
          </View>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.fullExerciseList}
            ListHeaderComponent={
              <View style={styles.fullViewHeader}>
                <Text style={[PATTERN.bigText, styles.fullWorkoutName]}>
                  {workout.name}
                </Text>
                <View style={styles.fullWorkoutMeta}>
                  <Text style={[PATTERN.smallText, styles.fullMetaText]}>
                    {userName}
                  </Text>
                  <Text style={[PATTERN.smallText, styles.fullMetaText]}>
                    {workout.duration}
                  </Text>
                </View>
              </View>
            }
            renderItem={({ item }) => {
              return (
                <View style={styles.fullExerciseCard}>
                  <View style={styles.fullExerciseTitleRow}>
                    <Text style={[PATTERN.mediumText, styles.fullExerciseName]}>
                      {item.name}
                    </Text>
                    <Text style={[PATTERN.smallText, styles.setCountText]}>
                      {item.sets.length} sets
                    </Text>
                  </View>

                  <View style={styles.exerciseDetails}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Primary</Text>
                      <Text style={styles.detailValue}>{item.primary}</Text>
                    </View>
                    {item.secondary ? (
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Secondary</Text>
                        <Text style={styles.detailValue}>{item.secondary}</Text>
                      </View>
                    ) : (
                      <></>
                    )}
                    {item.equipment ? (
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Equipment</Text>
                        <Text style={styles.detailValue}>{item.equipment}</Text>
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>

                  <View style={styles.setTable}>
                    <View style={styles.setTableHeader}>
                      <Text style={styles.setHeaderText}>Set</Text>
                      <Text style={styles.setHeaderText}>Lbs</Text>
                      <Text style={styles.setHeaderText}>Reps</Text>
                    </View>
                    {item.sets.map((set: FirebaseExercise["sets"][number]) => (
                      <View
                        key={set.id}
                        style={[
                          styles.setRow,
                          set.setNumber % 2 === 0
                            ? styles.evenSetRow
                            : undefined,
                        ]}
                      >
                        <Text style={styles.setCellText}>{set.setNumber}</Text>
                        <Text style={styles.setCellText}>
                          {set.weight || "-"}
                        </Text>
                        <Text style={styles.setCellText}>
                          {set.reps || "-"}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ReusableModal>
      <View style={styles.container}>
        <View style={styles.header}>
          <ProfilePhoto />
          <Text
            style={[PATTERN.mediumText, { fontWeight: "bold", marginLeft: 8 }]}
          >
            {userName}
          </Text>
        </View>

        <View style={styles.workoutTitle}>
          <Text style={[PATTERN.mediumText, { fontWeight: "bold" }]}>
            {workout.name}
          </Text>
          <View style={styles.workoutDateAndDuration}>
            <Text
              style={[PATTERN.smallText, { fontWeight: "bold", opacity: 0.5 }]}
            >
              {workout.duration}
            </Text>
          </View>
        </View>
        <FlatList
          scrollEnabled={false}
          data={displayedExercises}
          renderItem={({ item }) => {
            return <FinishedExercise exercise={item} />;
          }}
        />
        {exercises.length > MAX_EXERCISES ? (
          <PressableText
            onPress={() => setShowFullView(true)}
            customStyles={{
              ...PATTERN.smallText,
              fontWeight: "bold",
              top: 4,
            }}
          >
            View {exercises.length - MAX_EXERCISES} more exercise(s)
          </PressableText>
        ) : (
          <></>
        )}
      </View>
      <View style={PATTERN.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  workoutTitle: {
    marginVertical: 12,
  },
  workoutDateAndDuration: {
    flexDirection: "row",
  },
  fullViewContainer: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
    paddingTop: 20,
  },
  topButtonsContainer: {
    flexDirection: "row",
    padding: 20,
    marginTop: 12,
  },
  fullExerciseList: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  fullViewHeader: {
    marginBottom: 16,
  },
  fullWorkoutName: {
    maxWidth: "100%",
  },
  fullWorkoutMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  fullMetaText: {
    opacity: 0.75,
    fontWeight: "bold",
  },
  fullExerciseCard: {
    backgroundColor: BG_CONTRAST,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  fullExerciseTitleRow: {
    backgroundColor: MAIN_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fullExerciseName: {
    color: "black",
    fontWeight: "bold",
    flex: 1,
    paddingRight: 12,
  },
  setCountText: {
    color: "black",
    fontWeight: "bold",
  },
  exerciseDetails: {
    padding: 16,
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    ...PATTERN.smallText,
    opacity: 0.6,
    fontWeight: "bold",
  },
  detailValue: {
    ...PATTERN.smallText,
    marginTop: 2,
  },
  setTable: {
    paddingBottom: 12,
  },
  setTableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  setHeaderText: {
    ...PATTERN.smallText,
    width: "33%",
    fontWeight: "bold",
    textAlign: "center",
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  evenSetRow: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  setCellText: {
    ...PATTERN.smallText,
    width: "33%",
    textAlign: "center",
  },
});
