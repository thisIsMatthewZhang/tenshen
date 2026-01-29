import ExerciseCard from "@/src/screens/Workout/components/ExerciseCard";
import { useState } from "react";
import {
  DimensionValue,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  APP_BACKGROUND_COLOR,
  BLUE_LIGHTER,
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
            <ExerciseCard
              timer={timer}
              onPress={() => setShowTimerPicker(true)}
              pickerProps={{
                setIsVisible: setShowTimerPicker,
                visible: showTimerPicker,
                onConfirm({ minutes, seconds }) {
                  setTimer(minutes + "m " + seconds + "s");
                  setShowTimerPicker(false);
                },
                onCancel() {
                  setShowTimerPicker(false);
                },
              }}
            />
          </View>
          <Button
            title="Add Exercise +"
            bgColor={BLUE_LIGHTER}
            textColor="white"
            onPress={() => console.error("not implemented")}
            width={"90%"}
          />
        </View>
      </View>
    </Modal>
  );
}

export const Button = ({
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
          style={[PATTERN.smallText, { color: textColor, fontWeight: "bold" }]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

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

  allCards: {},
});
