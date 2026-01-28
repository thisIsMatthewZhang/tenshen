import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { APP_BACKGROUND_COLOR, PATTERN } from "../constants/theme";

interface WorkoutBuilderProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonProps {
  title: string;
  bgColor: string;
  textColor: string;
}

export default function WorkoutBuilder({
  state,
  setState,
}: WorkoutBuilderProps) {
  const Button = ({ title, bgColor, textColor }: ButtonProps) => {
    return (
      <Pressable
        style={({ pressed }) => {
          return { opacity: pressed ? 0.5 : 1 };
        }}
        onPress={() => setState(false)}
      >
        <View
          style={{
            backgroundColor: bgColor,
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 8,
            margin: 8,
          }}
        >
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
          <Button title="Done👍" bgColor="#308cfc" textColor="white" />
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
});
