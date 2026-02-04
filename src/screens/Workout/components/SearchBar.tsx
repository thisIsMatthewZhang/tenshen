import { ICON_SIZE, MAX_INPUT_LENGTH } from "@/src/constants/theme";
import { useSearchFilter } from "@/src/hooks/useSearchFilter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput, View } from "react-native";
import { exercises } from "../exercises";

export default function SearchBar() {
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
    <View style={styles.container}>
      <Ionicons name="search-sharp" size={ICON_SIZE} color="white" />
      <TextInput
        style={styles.input}
        placeholder="Search Exercise"
        placeholderTextColor={"white"}
        maxLength={MAX_INPUT_LENGTH}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#494A50",
    padding: 12,
  },
  input: {
    width: "85%",
    fontSize: 24,
    color: "white",
    marginLeft: 8,
  },
});
