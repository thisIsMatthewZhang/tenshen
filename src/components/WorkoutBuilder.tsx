import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  DimensionValue,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import {
  APP_BACKGROUND_COLOR,
  BLUE_DARKER,
  BLUE_LIGHTER,
  GOLD,
  PATTERN,
  TEXT_INPUT,
} from "../constants/theme";
interface WorkoutBuilderProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonProps {
  title: "Cancel" | "Done 👍" | "Add Exercise +" | "Confirm 👍";
  bgColor: string;
  textColor: string;
  onPress?: () => void;
  width?: DimensionValue;
}

export default function WorkoutBuilder({
  state,
  setState,
}: WorkoutBuilderProps) {
  const [exerciseAdded, setExerciseAdded] = useState<boolean>(false);
  const [showTimerPicker, setShowTimerPicker] = useState<boolean>(false);
  const [timer, setTimer] = useState<"Rest Timer" | string>("Rest Timer");

  const Button = ({
    title,
    bgColor,
    textColor,
    onPress,
    width,
  }: ButtonProps) => {
    const buttonStyles = {
      width: width,
      backgroundColor: bgColor,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      margin: 8,
    };
    return (
      <Pressable
        style={({ pressed }) => {
          return [
            buttonStyles,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ];
        }}
        onPress={onPress}
      >
        <View style={PATTERN.center}>
          <Text
            style={[
              PATTERN.smallText,
              { color: textColor, fontWeight: "bold" },
            ]}
          >
            {title}
          </Text>
        </View>
      </Pressable>
    );
  };
  const ExeciseCard = () => {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={[PATTERN.bigText, { color: "black" }]}>Squats</Text>
          <Pressable
            style={styles.timer}
            onPress={() => setShowTimerPicker(true)}
          >
            <Text
              style={[
                PATTERN.smallText,
                {
                  color: BLUE_DARKER,
                  fontWeight: 600,
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
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      visible={state}
      onRequestClose={() => setState(!state)}
      allowSwipeDismissal={true}
    >
      <View style={styles.outerView}>
        <View style={styles.topButtons}>
          <Button
            title="Cancel"
            bgColor="red"
            textColor="black"
            onPress={() => setState(false)}
          />
          <Button
            title="Done 👍"
            bgColor={BLUE_LIGHTER}
            textColor="white"
            onPress={() => console.error("non implemented")}
          />
        </View>
        <View style={[styles.innerView, PATTERN.center]}>
          <TextInput
            style={[TEXT_INPUT.input, { fontSize: 24 }]}
            placeholder="Workout Name"
            placeholderTextColor={"white"}
            maxLength={40}
          />
          <View style={styles.allCards}>
            <ExeciseCard />
          </View>
          <Button
            title="Add Exercise +"
            bgColor={BLUE_LIGHTER}
            textColor="black"
            onPress={() => console.error("not implemented")}
            width={"90%"}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  topButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  innerView: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timer: {},
  allCards: {},
  card: {
    width: Dimensions.get("screen").width * 0.9,
    height: 175,
    backgroundColor: GOLD,
    borderRadius: 20,
    margin: 8,
    padding: 12,
  },
});
