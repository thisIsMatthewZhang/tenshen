import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { APP_BACKGROUND_COLOR } from "../constants/theme";

export interface ReusableModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalProps?: ComponentPropsWithoutRef<typeof Modal>;
}

export default function ReusableModal(
  props: PropsWithChildren<ReusableModalProps>,
) {
  return (
    <Modal
      animationType="slide"
      allowSwipeDismissal={true}
      visible={props.showModal}
      onRequestClose={() => props.setShowModal(!props.showModal)}
      {...props.modalProps}
    >
      <View style={styles.container}>{props.children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
    paddingHorizontal: 12,
  },
});
