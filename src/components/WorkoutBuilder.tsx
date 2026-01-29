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
import {
  APP_BACKGROUND_COLOR,
  BLUE_LIGHTER,
  GOLD,
  PATTERN,
  TEXT_INPUT
} from "../constants/theme";

interface WorkoutBuilderProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonProps {
  title: "Cancel" | "Done 👍" | "Add Exercise +";
  bgColor: string;
  textColor: string;
  width?: DimensionValue;
}

export default function WorkoutBuilder({
  state,
  setState,
}: WorkoutBuilderProps) {
  const [exerciseAdded, setExerciseAdded] = useState<boolean>(false);

  const Button = ({ title, bgColor, textColor, width }: ButtonProps) => {
    const getButtonProps = ({ ...props }: ButtonProps) => {
      return props;
    };
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
        onPress={() => {
          const buttonProps = getButtonProps({
            title,
            bgColor,
            textColor,
            width,
          });
          if (buttonProps.title === "Cancel") setState(false);
        }}
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
    return <View style={styles.card}></View>;
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
          <Button title="Cancel" bgColor="red" textColor="black" />
          <Button title="Done 👍" bgColor={BLUE_LIGHTER} textColor="white" />
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
