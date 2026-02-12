import Button from "@/src/components/Button";
import ExercisePhoto from "@/src/components/ExercisePhoto";
import {
  APP_BACKGROUND_COLOR,
  BLUE_LIGHTER,
  GOLD,
  ICON_SIZE,
  PATTERN,
} from "@/src/constants/theme";
import { useSearchFilter } from "@/src/hooks/useSearchFilter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ReusableModal, {
  ReusableModalProps,
} from "../../../components/ReusableModal";
import SearchBar from "../../../components/SearchBar";
import { ExerciseContext } from "../ExerciseContext";
import { Exercise } from "../exercises";

interface SearchModalProps<T> extends ReusableModalProps {
  data: T[];
}

export default function SearchFilterModal({
  data,
  showModal,
  setShowModal,
}: SearchModalProps<Exercise>) {
  const { filteredData, searchQuery, setSearchQuery } = useSearchFilter(data, [
    "name",
    "muscleGroup",
  ]);
  const [selectedItems, setSelectedItems] = useState<Exercise[]>([]); // selectedItems acts as a bucket that appends selected exercises to preexisting exercises (exercises context)
  const [exercises, setExercises] = useContext(ExerciseContext);

  return (
    <ReusableModal
      showModal={showModal}
      setShowModal={() => setShowModal(!showModal)}
    >
      <View style={styles.headerContainer}>
        <Button
          title="Cancel"
          onPress={() => {
            for (let data of filteredData) {
              data.isSelected = false;
            }
            setShowModal(!showModal);
          }}
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
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* <View style={styles.buttonsContainer}>
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
        </View> */}
      </View>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => {
          return (
            <Pressable
              key={item.id}
              style={({ pressed }) => {
                return [
                  styles.data,
                  {
                    backgroundColor:
                      pressed || item.isSelected
                        ? "rgba(255, 255, 255, 0.1)"
                        : undefined,
                  },
                ];
              }}
              onPress={() => {
                setSelectedItems(
                  !item.isSelected
                    ? [...selectedItems, item]
                    : selectedItems.filter((curItem) => curItem.id !== item.id),
                );
                item.isSelected = !item.isSelected;
              }}
            >
              {item.isSelected ? (
                <Ionicons
                  name="checkbox-sharp"
                  size={ICON_SIZE}
                  color={BLUE_LIGHTER}
                />
              ) : (
                <></>
              )}
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
      {selectedItems.length > 0 ? (
        <View style={styles.footerContainer}>
          <Button
            title={`Add ${selectedItems.length} Exercise(s)`}
            bgColor={GOLD}
            textColor={"black"}
            onPress={() => {
              setShowModal(!showModal);
              setExercises([...exercises, ...selectedItems]);
              for (let data of filteredData) {
                data.isSelected = false;
              }
            }}
            style={{ width: "90%" }}
          />
        </View>
      ) : (
        <></>
      )}
      {/* {showEquipmentModal ? (
        <ReusableModal
          showModal={showEquipmentModal}
          setShowModal={setShowEquipmentModal}
        >
          <FlatList
            data={equipment}
            renderItem={({ item }) => {
              return (
                <Pressable key={item.id} style={styles.data}>
                  <ExercisePhoto />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={PATTERN.smallText}>{item.name}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </ReusableModal>
      ) : (
        <></>
      )}
      {showMuscleGroupModal ? (
        <ReusableModal
          showModal={showMuscleGroupModal}
          setShowModal={setShowMuscleGroupModal}
        >
          <FlatList
            data={muscleGroups}
            renderItem={({ item }) => {
              return (
                <Pressable key={item.id} style={styles.data}>
                  <ExercisePhoto />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={PATTERN.smallText}>{item.name}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </ReusableModal>
      ) : (
        <></>
      )} */}
    </ReusableModal>
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
  footerContainer: {
    width: "100%",
    backgroundColor: undefined,
    alignItems: "center",
    marginBottom: 28,
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
