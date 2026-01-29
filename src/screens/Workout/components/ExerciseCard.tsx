import { Button } from "@/src/components/WorkoutBuilder";
import {
    BLUE_DARKER,
    BLUE_LIGHTER,
    GOLD,
    ICON_SIZE,
    PATTERN,
} from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentPropsWithoutRef } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

interface ExerciseCardProps {
  timer: string;
  onPress: () => void;
  pickerProps: ComponentPropsWithoutRef<typeof TimerPickerModal>;
}

const AddSetButton = () => {
  return (
    <Pressable
      style={({ pressed }) => {
        return [{ opacity: pressed ? 0.85 : 1 }];
      }}
    >
      <Ionicons name="add-circle-sharp" size={ICON_SIZE} color={BLUE_LIGHTER} />
    </Pressable>
  );
};
const setSegment = () => {};

export default function ExerciseCard({
  timer,
  onPress,
  pickerProps,
}: ExerciseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.title}>
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
      <View style={styles.cardBottom}>
        <View style={styles.headers}>
          <Text>Sets</Text>
          <Text>Lbs</Text>
          <Text>Reps</Text>
        </View>
        <View
          style={[
            PATTERN.separator,
            { backgroundColor: "black", marginVertical: 0 },
          ]}
        />
        <View style={styles.emptySegment}>
          <AddSetButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width * 0.9,
    // height: 200,
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

  headers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  cardBottom: { width: "100%" },
  emptySegment: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  setSegment: { width: "100%" },
});
