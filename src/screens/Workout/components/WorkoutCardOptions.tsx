import {
  APP_BACKGROUND_COLOR,
  ICON_SIZE,
  PATTERN,
} from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { WorkoutsContext } from "../WorkoutsContext";
import { WorkoutCardProps } from "./WorkoutCard";

export default function WorkoutCardExtraOptions({
  id,
  workoutName,
  exercises,
}: WorkoutCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [workouts, setWorkouts] = useContext(WorkoutsContext);
  return (
    <Pressable onPress={() => setModalVisible(!modalVisible)}>
      <Ionicons
        style={{ position: "absolute", alignSelf: "flex-end", bottom: 0 }}
        name="ellipsis-vertical"
        size={ICON_SIZE}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        allowSwipeDismissal={true}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.outerView}
        >
          <Pressable style={styles.innerView}>
            <View style={styles.header}>
              <Text style={[PATTERN.mediumText, { textAlign: "center" }]}>
                {workoutName}
              </Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={{ marginHorizontal: 12 }}
              >
                <Ionicons name="close-sharp" size={ICON_SIZE} color={"white"} />
              </Pressable>
            </View>
            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons
                name="swap-horizontal-sharp"
                size={ICON_SIZE}
                color="white"
              />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Replace Workout
              </Text>
            </Pressable>

            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons name="pencil-sharp" size={ICON_SIZE} color="white" />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Edit Workout
              </Text>
            </Pressable>

            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons name="share-sharp" size={ICON_SIZE} color="white" />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Share Workout
              </Text>
            </Pressable>

            <View style={PATTERN.separator} />

            <Pressable
              style={styles.option}
              onPress={() => {
                setWorkouts(
                  workouts.filter((workout) => {
                    return workout.id !== id;
                  }),
                );
                setModalVisible(!modalVisible);
              }}
            >
              <Ionicons
                name="remove-circle-sharp"
                size={ICON_SIZE}
                color="red"
              />
              <Text
                style={[
                  PATTERN.smallText,
                  { marginHorizontal: 8, color: "red" },
                ]}
              >
                Delete Workout
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: APP_BACKGROUND_COLOR,
    opacity: 0.95,
  },
  innerView: {
    width: "100%",
    height: 325,
    backgroundColor: "black",
    paddingVertical: 12,
  },
  header: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-end",
  },
  option: {
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
