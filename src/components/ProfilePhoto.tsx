import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_BACKGROUND_COLOR, ICON_SIZE } from "../constants/theme";

interface ProfilePhotoProps {
  scale?: number;
}

export default function ProfilePhoto({ scale = 0.125 }: ProfilePhotoProps) {
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView
      style={[
        styles.circle,
        {
          width: width * scale,
          height: width * scale,
          borderRadius: Math.round(width / 2),
        },
      ]}
    >
      <View>
        {hasPhoto ? (
          <></>
        ) : (
          <Ionicons
            name="person"
            size={ICON_SIZE + 12}
            color={APP_BACKGROUND_COLOR}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    borderWidth: 2,
    // marginInline: 8,
  },
});
