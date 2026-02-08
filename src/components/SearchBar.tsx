import { ICON_SIZE, MAX_INPUT_LENGTH } from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, StyleSheet, TextInput, View } from "react-native";

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
        onChangeText={(text) => {
          setSearchQuery(text);
        }}
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
    borderRadius: 15,
    padding: Platform.OS === "ios" ? 8 : 0,
    paddingLeft: 12,
    marginBottom: 12,
  },
  input: {
    width: "85%",
    fontSize: 20,
    color: "white",
    marginLeft: 8,
  },
});
