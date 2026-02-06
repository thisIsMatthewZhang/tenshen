import { BLUE_LIGHTER, PATTERN } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

interface FilterButtonProps {
  filterType: string;
  activeFilters: Record<string, any>;
  setActiveFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export default function FilterButton({ filterType }: FilterButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
    >
      <Text style={[PATTERN.smallText, { fontWeight: "bold" }]}>
        {filterType}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "47.5%",
    backgroundColor: BLUE_LIGHTER,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 12,
  },
});
