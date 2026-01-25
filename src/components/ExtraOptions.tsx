import {
  APP_BACKGROUND_COLOR,
  ICON_SIZE,
  PATTERN,
} from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function ExtraOptions() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Pressable onPress={() => setModalVisible(!modalVisible)}>
      <Ionicons
        style={{ position: "absolute", alignSelf: "flex-end", bottom: 0 }}
        name="ellipsis-vertical"
        size={ICON_SIZE}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        allowSwipeDismissal={true}
      >
        <View style={styles.outerView}>
          <View style={styles.innerView}>
            <Pressable>
              <Text style={PATTERN.smallText}>Replace Workout</Text>
            </Pressable>
            <View style={PATTERN.separator} />
            <Pressable>
              <Text style={PATTERN.smallText}>Edit Workout</Text>
            </Pressable>
            <View style={PATTERN.separator} />
            <Pressable>
              <Text style={[PATTERN.smallText, { color: "red" }]}>
                Delete Workout
              </Text>
            </Pressable>
            <View style={PATTERN.separator} />
          </View>
        </View>
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
    opacity: 0.9,
  },
  innerView: {
    width: "100%",
    height: 250,
    backgroundColor: "black",
    paddingVertical: 20,
  },
});
