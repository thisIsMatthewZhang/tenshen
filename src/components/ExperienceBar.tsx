import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import Reanimated from "react-native-reanimated";

export interface ExperienceBarProps {}

export default function ExperienceBar(
  props: PropsWithChildren<ExperienceBarProps>,
) {
  return (
    <Reanimated.View style={[styles.expBarContainer, {}]}>
      {props.children}
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  expBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 12,
  },
});
