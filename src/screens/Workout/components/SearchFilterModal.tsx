import ExercisePhoto from "@/src/components/ExercisePhoto";
import { APP_BACKGROUND_COLOR, PATTERN } from "@/src/constants/theme";
import { useSearchFilter } from "@/src/hooks/useSearchFilter";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Exercise } from "../exercises";
import FilterButton from "./FilterButton";
import SearchBar from "./SearchBar";
import { WorkoutBuilderProps } from "./WorkoutBuilder";

interface SearchModalProps<T> extends WorkoutBuilderProps {
  data: T[];
}

export default function SearchFilterModal({
  data,
  showModal,
  setShowModal,
}: SearchModalProps<Exercise>) {
  const {
    filteredData,
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    sortConfig,
    setSortConfig,
  } = useSearchFilter(data, ["name", "muscleGroup"]);

  return (
    <Modal visible={showModal} onRequestClose={() => setShowModal(!showModal)}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <View style={styles.buttonsContainer}>
            <FilterButton
              filterType="Equipment"
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
            <FilterButton
              filterType="Muscle"
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </View>
          <View style={styles.listContainer}>
            {filteredData.map((item) => {
              return (
                <Pressable key={item.id} style={styles.data}>
                  <ExercisePhoto />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={PATTERN.smallText}>{item.name}</Text>
                    <Text style={[PATTERN.smallText, { opacity: 0.5 }]}>
                      {item.muscleGroup}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
    paddingHorizontal: 12,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 60,
    marginBottom: 20,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContainer: {
    width: "100%",
    marginTop: 40,
  },
  data: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});
