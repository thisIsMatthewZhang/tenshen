import {
  BLUE_DARKER,
  BLUE_LIGHTER,
  MAIN_COLOR,
  PATTERN,
} from "@/src/constants/theme";
import { ExerciseCard as ExerciseCardType } from "@/src/types/exercisecard";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TimerPickerModal } from "react-native-timer-picker";
import uuid from "react-native-uuid";
import { ExerciseContext } from "../contexts/ExerciseContext";
import AppButton from "./AppButton";
import ExerciseCardOptions from "./ExerciseCardOptions";
export interface ExerciseSetSegmentProps {
  id: string;
  setNumber: number;
  weight: string;
  reps: string;
  onUpdate: (id: string, type: "weight" | "reps", value: string) => void;
  onDelete: (seg: ExerciseSetSegmentProps) => void;
}

const ExerciseSetSegment = ({
  id,
  setNumber,
  weight,
  reps,
  onDelete,
  onUpdate,
}: ExerciseSetSegmentProps) => {
  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>,
  ) => {
    let width: number = 0;
    useAnimatedReaction(
      () => drag.value,
      (prepared) => {
        width = prepared;
      },
    );

    const animatedStyle = useAnimatedStyle(() => {
      return { transform: [{ translateX: drag.value + 75 }] };
    });
    return (
      <Reanimated.View
        style={[
          animatedStyle,
          {
            width: width + 75,
            backgroundColor: "red",
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => {
            return {
              width: width + 75,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.5 : 1,
            };
          }}
          onPress={() =>
            onDelete({
              id,
              setNumber,
              weight,
              reps,
              onDelete,
              onUpdate,
            })
          }
        >
          <Text
            style={[PATTERN.smallText, { color: "black", fontWeight: 600 }]}
          >
            Delete
          </Text>
        </Pressable>
      </Reanimated.View>
    );
  };

  return (
    <Swipeable
      overshootRight={false}
      rightThreshold={50}
      renderRightActions={RightAction}
      childrenContainerStyle={[
        styles.segment,
        {
          backgroundColor:
            setNumber % 2 === 0 ? "rgba(255, 255, 255, 0.5)" : "transparent",
        },
      ]}
    >
      <Text style={[PATTERN.smallText, { color: "black" }]}>{setNumber}</Text>
      <TextInput
        maxLength={4}
        keyboardType="decimal-pad"
        aria-label="Weight"
        style={[PATTERN.smallText, { color: "black" }]}
        placeholder="-"
        placeholderTextColor="black"
        value={weight}
        onChangeText={(text) => onUpdate(id, "weight", text)}
      />
      <TextInput
        maxLength={2}
        keyboardType="decimal-pad"
        aria-label="Reps"
        style={[PATTERN.smallText, { color: "black" }]}
        placeholder="-"
        placeholderTextColor="black"
        value={reps}
        onChangeText={(text) => onUpdate(id, "reps", text)}
      />
    </Swipeable>
  );
};

export default function ExerciseCard(props: ExerciseCardType) {
  const [showTimerPicker, setShowTimerPicker] = useState<boolean>(false);
  const [timer, setTimer] = useState<"Rest Timer" | string>("Rest Timer");
  const [exercises, setExercises] = useContext(ExerciseContext);

  const handleSegmentUpdate = (
    id: string,
    type: "weight" | "reps",
    value: string,
  ) => {
    const updatedSegments = props.sets.map((seg) =>
      seg.id === id ? { ...seg, [type]: value } : seg,
    );
    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.id === props.id ? { ...ex, sets: updatedSegments } : ex,
      ),
    );
  };

  const handleSegmentDeletion = (seg: ExerciseSetSegmentProps) => {
    setExercises((prev) => {
      return prev.map((ex) =>
        ex.id === props.id
          ? {
              ...ex,
              sets: ex.sets
                .filter(
                  (s: ExerciseSetSegmentProps) => s.setNumber !== seg.setNumber,
                )
                .map((s: ExerciseSetSegmentProps, i: number) => {
                  return { ...s, setNumber: i + 1 };
                }),
            }
          : ex,
      );
    });
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.card}>
        <View style={styles.title}>
          <View>
            <Text style={[PATTERN.mediumText, styles.exerciseNameText]}>
              {props.name}
            </Text>
            <Pressable onPress={() => setShowTimerPicker(true)}>
              <Text
                style={[
                  PATTERN.smallText,
                  {
                    color: BLUE_DARKER,
                    fontWeight: 800,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                {timer}
              </Text>
              <TimerPickerModal
                closeOnOverlayPress
                LinearGradient={LinearGradient}
                setIsVisible={setShowTimerPicker}
                visible={showTimerPicker}
                onConfirm={({ minutes, seconds }) => {
                  setTimer(minutes + "m " + seconds + "s");
                  setShowTimerPicker(false);
                }}
                onCancel={() => setShowTimerPicker(false)}
                hideHours={true}
                secondInterval={15}
                styles={{ theme: "dark" }}
                confirmButton={
                  <AppButton
                    title="Confirm 👍"
                    bgColor={BLUE_LIGHTER}
                    textColor="white"
                    onPress={() => {}}
                  />
                }
                cancelButton={
                  <AppButton
                    title="Cancel"
                    bgColor="red"
                    textColor="black"
                    onPress={() => {}}
                  />
                }
              />
            </Pressable>
          </View>
          <ExerciseCardOptions
            id={props.id}
            name={props.name}
            primary={props.primary}
            secondary={props.secondary}
            riveUrl={props.riveUrl}
            equipment={props.equipment}
            isSelected
            sets={props.sets}
          />
        </View>
        <View style={styles.cardBottom}>
          <View style={styles.header}>
            <Text
              style={[
                PATTERN.smallText,
                { fontWeight: "bold", color: "black" },
              ]}
            >
              Sets
            </Text>
            <Text
              style={[
                PATTERN.smallText,
                { fontWeight: "bold", color: "black" },
              ]}
            >
              Lbs
            </Text>
            <Text
              style={[
                PATTERN.smallText,
                { fontWeight: "bold", color: "black" },
              ]}
            >
              Reps
            </Text>
          </View>
          <View
            style={[
              PATTERN.separator,
              { backgroundColor: "black", marginVertical: 0 },
            ]}
          />
          {props.sets.map((seg) => {
            return (
              // these are the segments being rerendered each time a set is added or deleted
              <ExerciseSetSegment
                key={seg.id}
                id={seg.id}
                setNumber={seg.setNumber}
                weight={seg.weight}
                reps={seg.reps}
                onDelete={handleSegmentDeletion}
                onUpdate={handleSegmentUpdate}
              />
            );
          })}
          <View style={styles.emptySegment}>
            <AppButton
              title="Add Set +"
              bgColor={BLUE_DARKER}
              textColor="white"
              onPress={() => {
                setExercises((prev) =>
                  prev.map((ex) =>
                    ex.id === props.id
                      ? {
                          ...ex,
                          sets: [
                            ...ex.sets,
                            {
                              id: uuid.v4(),
                              setNumber: ex.sets.length + 1,
                              weight: "",
                              reps: "",
                              onDelete: () => {},
                              onUpdate: handleSegmentUpdate,
                            },
                          ],
                        }
                      : ex,
                  ),
                );
              }}
              customStyle={{ width: "90%", margin: 8 }}
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width * 0.9,
    backgroundColor: MAIN_COLOR,
    borderRadius: 20,
    margin: 8,
    paddingVertical: 8,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  exerciseNameText: {
    color: "black",
    fontWeight: "bold",
    maxWidth: 250,
    lineHeight: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  segment: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingVertical: Platform.OS === "ios" ? 12 : 0,
  },
  cardBottom: { width: "100%" },
  emptySegment: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
