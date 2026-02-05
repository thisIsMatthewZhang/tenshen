import { PATTERN } from "@/src/constants/theme";
import { useSearchFilter } from "@/src/hooks/useSearchFilter";
import { Modal, StyleSheet, View } from "react-native";
import { exercises } from "../exercises";
import SearchBar from "./SearchBar";
import { WorkoutBuilderProps } from "./WorkoutBuilder";

export default function SearchModal({
  showModal,
  setShowModal,
}: WorkoutBuilderProps) {
  const {
    filteredData,
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    sortConfig,
    setSortConfig,
  } = useSearchFilter(exercises, ["category", "exercises"]);

  return (
    <Modal visible={showModal} onRequestClose={() => setShowModal(!showModal)}>
      <View
        style={[
          PATTERN.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
