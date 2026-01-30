import ExerciseCard from "@/src/screens/Workout/components/ExerciseCard";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
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
import Button from "../screens/Workout/components/Button";
const rudy = require("../../assets/avatars/Rudy.png");

interface WorkoutBuilderProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WorkoutBuilder({
  state,
  setState,
}: WorkoutBuilderProps) {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [showTimerPicker, setShowTimerPicker] = useState<boolean>(false);
  const [timer, setTimer] = useState<"Rest Timer" | string>("Rest Timer");
  const [workoutName, setWorkoutName] = useState<string>("");

  return (
    <Modal
      animationType="slide"
      visible={state}
      onRequestClose={() => setState(!state)}
      allowSwipeDismissal={true}
    >
      <ScrollView contentContainerStyle={styles.outerView}>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            bottom: "77.5%",
          }}
        >
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
          <TextInput
            style={[TEXT_INPUT.input, { fontSize: 24 }]}
            placeholder="Workout Name"
            placeholderTextColor={"white"}
            maxLength={40}
            value={workoutName}
            onChangeText={(text) => setWorkoutName(text)}
          />
        </View>
        <View style={[styles.innerView, PATTERN.center]}>
          <View style={styles.allCards}>
            {isEmpty ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Image source={rudy} width={25} height={25} />
                </View>
                <Text style={PATTERN.bigText}>
                  Ready to build a workout routine? Let&apos;s get started!
                </Text>
              </View>
            ) : (
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
            )}
          </View>
          <Button
            title="Add Exercise +"
            bgColor={BLUE_LIGHTER}
            textColor="white"
            onPress={() => console.error("not implemented")}
            width={"90%"}
          />
        </View>
      </ScrollView>
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

  allCards: { width: "100%", alignItems: "center" },
});
