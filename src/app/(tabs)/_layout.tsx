import { GOLD, TAB_ICON_SIZE } from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: GOLD,
        // tabBarActiveBackgroundColor: "#EAF2FF",
        tabBarBackground: () => (
          <View
            style={{ backgroundColor: "#EAF2FF", minHeight: "100%" }}
          ></View>
        ),
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={TAB_ICON_SIZE} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout/index"
        options={{
          title: "Workout",
          tabBarIcon: ({ color }) => (
            <Ionicons name="barbell-sharp" color={color} size={TAB_ICON_SIZE} />
          ),
        }}
      />
      <Tabs.Screen
        name="community/index"
        options={{
          title: "Community",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-sharp" color={color} size={TAB_ICON_SIZE} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={TAB_ICON_SIZE} />
          ),
        }}
      />
    </Tabs>
  );
}
