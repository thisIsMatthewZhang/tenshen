import {
  BLUE_DARKER,
  BLUE_LIGHTER,
  GOLD,
  PATTERN,
} from "@/src/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
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
import Button from "../../../components/Button";
import ExerciseCardOptions from "./ExerciseCardOptions";

export interface ExerciseCardProps {
  id: string;
  exerciseName: string;
}

interface SetSegmentProps {
  id: string;
  setNumber: number;
  weight: string;
  reps: string;
  onDelete: () => void;
}

const SetSegment = ({ setNumber, weight, reps, onDelete }: SetSegmentProps) => {
  const [weightInput, setWeightInput] = useState(weight);
  const [repInput, setRepInput] = useState(reps);
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
          onPress={onDelete}
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
        placeholderTextColor={"black"}
        value={weightInput}
        onChangeText={(text) => setWeightInput(text)}
      />
      <TextInput
        maxLength={2}
        keyboardType="decimal-pad"
        aria-label="Reps"
        style={[PATTERN.smallText, { color: "black" }]}
        placeholder="-"
        placeholderTextColor={"black"}
        value={repInput}
        onChangeText={(text) => setRepInput(text)}
      />
    </Swipeable>
  );
};

export default function ExerciseCard({ id, exerciseName }: ExerciseCardProps) {
  const [segments, setSegments] = useState<SetSegmentProps[]>([]);
  const [showTimerPicker, setShowTimerPicker] = useState<boolean>(false);
  const [timer, setTimer] = useState<"Rest Timer" | string>("Rest Timer");

  return (
    <GestureHandlerRootView>
      <View style={styles.card}>
        <View style={styles.title}>
          <View>
            <Text style={[PATTERN.mediumText, styles.exerciseNameText]}>
              {exerciseName}
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
                  <Button
                    title="Confirm 👍"
                    bgColor={BLUE_LIGHTER}
                    textColor="white"
                  />
                }
                cancelButton={
                  <Button title="Cancel" bgColor="red" textColor="black" />
                }
              />
            </Pressable>
          </View>
          <ExerciseCardOptions id={id} exerciseName={exerciseName} />
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
          {segments.map((segment) => {
            return (
              // these are the segments being rerendered each time set adder is pressed
              <SetSegment
                key={segment.id}
                id={segment.id}
                setNumber={segment.setNumber} // acts as id
                weight={segment.weight}
                reps={segment.reps}
                onDelete={() => {
                  setSegments((prev) => [
                    ...prev
                      .filter((s) => {
                        return s.setNumber !== segment.setNumber;
                      })
                      .map((s, i) => {
                        return {
                          ...s,
                          setNumber: i + 1,
                        };
                      }),
                  ]);
                }}
              />
            );
          })}
          <View style={styles.emptySegment}>
            <Button
              title="Add Set +"
              bgColor={BLUE_DARKER}
              textColor="white"
              onPress={() => {
                setSegments((prev) => [
                  // new segment being appended to the original array of segments
                  ...prev,
                  {
                    id: uuid.v4(),
                    setNumber: prev.length + 1,
                    weight: "",
                    reps: "",
                    onDelete: () => setSegments,
                  },
                ]);
              }}
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
    backgroundColor: GOLD,
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
