import { PATTERN } from "@/src/constants/theme";
import { Modal, StyleSheet, View } from "react-native";
import SearchBar from "./SearchBar";
import { WorkoutBuilderProps } from "./WorkoutBuilder";

export default function SearchModal({
  showModal,
  setShowModal,
}: WorkoutBuilderProps) {
  return (
    <Modal visible={showModal} onRequestClose={() => setShowModal(!showModal)}>
      <View style={PATTERN.container}>
        <View>
          <SearchBar />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
