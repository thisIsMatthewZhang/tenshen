import { Modal, View } from "react-native";
import { WorkoutBuilderProps } from "./WorkoutBuilder";

export default function SearchModal({
  showModal,
  setShowModal,
}: WorkoutBuilderProps) {
  return (
    <Modal visible={showModal} onRequestClose={() => setShowModal(!showModal)}>
      <View></View>
    </Modal>
  );
}
