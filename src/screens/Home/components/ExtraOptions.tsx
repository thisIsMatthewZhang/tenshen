import { ICON_SIZE } from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

export default function ExtraOptions() {
  return (
    <Pressable>
      <Ionicons
        style={{ position: "absolute", alignSelf: "flex-end", bottom: 0 }}
        name="ellipsis-vertical"
        size={ICON_SIZE}
      />
    </Pressable>
  );
}
