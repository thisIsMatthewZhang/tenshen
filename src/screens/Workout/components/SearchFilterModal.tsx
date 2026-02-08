import Button from "@/src/components/Button";
import ExercisePhoto from "@/src/components/ExercisePhoto";
import {
  APP_BACKGROUND_COLOR,
  BLUE_LIGHTER,
  PATTERN,
} from "@/src/constants/theme";
import { useSearchFilter } from "@/src/hooks/useSearchFilter";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import ModalWithList from "../../../components/ModalWithList";
import SearchBar from "../../../components/SearchBar";
import { Exercise } from "../exercises";
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
  const [showEquipmentModal, setShowEquipmentModal] = useState<boolean>(false);
  const [showMuscleGroupModal, setShowMuscleGroupModal] =
    useState<boolean>(false);

  return (
    <Modal visible={showModal} onRequestClose={() => setShowModal(!showModal)}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Button
            title="Cancel"
            onPress={() => setShowModal(!showModal)}
            bgColor={"red"}
            textColor={"black"}
          />
          <Text style={[PATTERN.smallText, { fontWeight: "bold" }]}>
            Add Exercise
          </Text>
          <Button
            title="Cancel"
            onPress={() => setShowModal(!showModal)}
            bgColor={"red"}
            textColor={"black"}
          />
        </View>
        <View style={styles.searchFilterContainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <View style={styles.buttonsContainer}>
            <Button
              title="Equipment"
              bgColor={BLUE_LIGHTER}
              textColor={"white"}
              onPress={() => setShowEquipmentModal(!showEquipmentModal)}
              width={"45%"}
            />
            <Button
              title="Muscle"
              bgColor={BLUE_LIGHTER}
              textColor={"white"}
              onPress={() => setShowMuscleGroupModal(!showMuscleGroupModal)}
              width={"45%"}
            />
          </View>
        </View>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => {
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
          }}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {showEquipmentModal ? (
        <ModalWithList
          showModal={showEquipmentModal}
          setShowModal={setShowEquipmentModal}
          data={[]}
        />
      ) : (
        <></>
      )}
      {showMuscleGroupModal ? (
        <ModalWithList
          showModal={showMuscleGroupModal}
          setShowModal={setShowMuscleGroupModal}
          data={[]}
        />
      ) : (
        <></>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
    paddingHorizontal: 12,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
  },
  searchFilterContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 8,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContainer: {
    width: "100%",
  },
  data: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});
