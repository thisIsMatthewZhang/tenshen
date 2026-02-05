import { ICON_SIZE, MAX_INPUT_LENGTH } from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-sharp" size={ICON_SIZE} color="white" />
      <TextInput
        style={styles.input}
        placeholder="Search Exercise"
        placeholderTextColor={"white"}
        maxLength={MAX_INPUT_LENGTH}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#494A50",
    borderRadius: 20,
    padding: 12,
  },
  input: {
    width: "85%",
    fontSize: 24,
    color: "white",
    marginLeft: 8,
  },
});
