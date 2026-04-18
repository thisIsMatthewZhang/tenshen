import AppButton from "@/src/components/AppButton";
import ExercisePhoto from "@/src/components/ExercisePhoto";
import {
  BLUE_LIGHTER,
  ICON_SIZE,
  MAIN_COLOR,
  PATTERN,
} from "@/src/constants/theme";
import { useSearchFilter } from "@/src/hooks/useSearchFilter";
import { ExerciseCard } from "@/src/types/exercisecard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ExerciseContext } from "../contexts/ExerciseContext";
import ReusableModal, { ReusableModalProps } from "./ReusableModal";
import SearchBar from "./SearchBar";

interface SearchModalProps<T> extends ReusableModalProps {
  data: T[];
}

export default function SearchFilterModal({
  data,
  showModal,
  setShowModal,
}: SearchModalProps<ExerciseCard>) {
  const { filteredData, searchQuery, setSearchQuery } = useSearchFilter(data, [
    "name",
    "primary",
  ]);
  const [selectedItems, setSelectedItems] = useState<ExerciseCard[]>([]); // bucket that appends selected exercises to preexisting exercises (exercises context)
  const [exercisesContext, setExercisesContext] = useContext(ExerciseContext);
  const exerciseContextIds = exercisesContext.map((ex) => ex.id); // needed b/c ExerciseCard.sets causes mismatching
  const filteredDataUpdated = filteredData.filter(
    (data) => !exerciseContextIds.includes(data.id),
  );

  return (
    <ReusableModal
      showModal={showModal}
      setShowModal={() => setShowModal(!showModal)}
    >
      <View style={[PATTERN.container, { paddingHorizontal: 12 }]}>
        <View style={styles.headerContainer}>
          <AppButton
            title="Cancel"
            onPress={() => {
              for (let data of filteredData) {
                data.isSelected = false;
              }
              setShowModal(!showModal);
            }}
            bgColor={"red"}
            textColor={"black"}
            customStyle={{ margin: 8 }}
          />
          <Text style={[PATTERN.smallText, { fontWeight: "bold" }]}>
            Add Exercise
          </Text>
          <AppButton
            title="Cancel"
            onPress={() => setShowModal(!showModal)}
            bgColor={"red"}
            textColor={"black"}
            customStyle={{ margin: 8 }}
          />
        </View>
        <View style={styles.searchFilterContainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
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
          data={filteredDataUpdated}
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
                      : selectedItems.filter(
                          (curItem) => curItem.id !== item.id,
                        ),
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
                    {item.primary}
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
            <AppButton
              title={`Add ${selectedItems.length} Exercise(s)`}
              bgColor={MAIN_COLOR}
              textColor={"black"}
              onPress={() => {
                setShowModal(!showModal);
                setExercisesContext([...exercisesContext, ...selectedItems]);
                for (let data of filteredData) {
                  data.isSelected = false;
                }
              }}
              customStyle={{ width: "90%", margin: 8 }}
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
      </View>
    </ReusableModal>
  );
}

const styles = StyleSheet.create({
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
