import {
    BLUE_DARKER,
    BLUE_LIGHTER,
    GOLD,
    PATTERN,
} from "@/src/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentPropsWithoutRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import Button from "./Button";
import ExerciseCardOptions from "./ExerciseCardOptions";

interface ExerciseCardProps {
  timer: string;
  onPress: () => void;
  pickerProps: ComponentPropsWithoutRef<typeof TimerPickerModal>;
}
interface SetSegmentProps {
  setNumber: number;
  weight: number | "-";
  reps: number | "-";
}

const SetSegment = ({ setNumber, weight, reps }: SetSegmentProps) => {
  return (
    <View
      style={[
        styles.segment,
        {
          backgroundColor:
            setNumber % 2 === 0 ? "rgba(255, 255, 255, 0.5)" : "none",
        },
      ]}
    >
      <Text style={[PATTERN.smallText, { color: "black" }]}>{setNumber}</Text>
      <Text style={[PATTERN.smallText, { color: "black" }]}>{weight}</Text>
      <Text style={[PATTERN.smallText, { color: "black" }]}>{reps}</Text>
    </View>
  );
};

export default function ExerciseCard({
  timer,
  onPress,
  pickerProps,
}: ExerciseCardProps) {
  const [segments, setSegments] = useState<SetSegmentProps[]>([]);
  const [segmentCounter, setSegmentCounter] = useState<number>(1);
  return (
    <View style={styles.card}>
      <View style={styles.title}>
        <View>
          <Text style={[PATTERN.bigText, { color: "black" }]}>Squats</Text>
          <Pressable onPress={onPress}>
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
              setIsVisible={pickerProps.setIsVisible}
              visible={pickerProps.visible}
              onConfirm={pickerProps.onConfirm}
              onCancel={pickerProps.onCancel}
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
        <ExerciseCardOptions />
      </View>
      <View style={styles.cardBottom}>
        <View style={styles.header}>
          <Text
            style={[PATTERN.smallText, { fontWeight: "bold", color: "black" }]}
          >
            Sets
          </Text>
          <Text
            style={[PATTERN.smallText, { fontWeight: "bold", color: "black" }]}
          >
            Lbs
          </Text>
          <Text
            style={[PATTERN.smallText, { fontWeight: "bold", color: "black" }]}
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
            <SetSegment
              key={segment.setNumber}
              setNumber={segment.setNumber}
              weight={segment.weight}
              reps={segment.reps}
            />
          );
        })}
        <View style={styles.emptySegment}>
          <Button
            title="Add Set +"
            bgColor={BLUE_DARKER}
            textColor="white"
            onPress={() => {
              setSegments([
                ...segments,
                { setNumber: segmentCounter, weight: "-", reps: "-" },
              ]);
              setSegmentCounter((value) => value + 1);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width * 0.9,
    // maxHeight: 300,
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
    paddingVertical: 8,
  },
  cardBottom: { width: "100%" },
  emptySegment: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 16,
  },
});
