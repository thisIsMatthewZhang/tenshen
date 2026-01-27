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
            <Pressable style={styles.option}>
              <Ionicons
                name="swap-horizontal-sharp"
                size={ICON_SIZE}
                color="white"
              />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Replace Workout
              </Text>
            </Pressable>

            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons name="pencil-sharp" size={ICON_SIZE} color="white" />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Edit Workout
              </Text>
            </Pressable>

            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons name="share-sharp" size={ICON_SIZE} color="white" />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Share Workout
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
                Delete Workout
              </Text>
            </Pressable>
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
    opacity: 0.95,
  },
  innerView: {
    width: "100%",
    height: 250,
    backgroundColor: "black",
    paddingVertical: 16,
  },
  option: {
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
