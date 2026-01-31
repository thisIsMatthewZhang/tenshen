import {
    APP_BACKGROUND_COLOR,
    ICON_SIZE,
    PATTERN,
} from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function WorkoutCardExtraOptions() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Pressable onPress={() => setModalVisible(!modalVisible)}>
      <Ionicons name="ellipsis-vertical" size={ICON_SIZE} />
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        allowSwipeDismissal={true}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.outerView}
        >
          <Pressable style={styles.innerView}>
            <View style={styles.header}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={{ marginHorizontal: 12, alignSelf: "flex-end" }}
              >
                <Ionicons name="close-sharp" size={ICON_SIZE} color={"white"} />
              </Pressable>
            </View>
            <Pressable style={styles.option}>
              <Ionicons
                name="swap-vertical-sharp"
                size={ICON_SIZE}
                color="white"
              />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Reorder Exercise
              </Text>
            </Pressable>
            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons
                name="swap-horizontal-sharp"
                size={ICON_SIZE}
                color="white"
              />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Replace Exercise
              </Text>
            </Pressable>

            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons
                name="remove-circle-sharp"
                size={ICON_SIZE}
                color="red"
              />
              <Text
                style={[
                  PATTERN.smallText,
                  { marginHorizontal: 8, color: "red" },
                ]}
              >
                Delete Exercise
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: APP_BACKGROUND_COLOR,
    opacity: 0.95,
  },
  innerView: {
    width: "100%",
    height: 250,
    backgroundColor: "black",
    paddingVertical: 12,
  },
  header: {
    // justifyContent: "space-between",
    // alignSelf: "flex-end",
  },
  option: {
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
