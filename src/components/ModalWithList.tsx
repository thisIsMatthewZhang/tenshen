import { Modal } from "react-native";

interface ModalWithListProps<T> {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: T[];
}

export default function ModalWithList({
  showModal,
  setShowModal,
  data,
}: ModalWithListProps<object>) {
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}
    ></Modal>
  );
}
