import { ICON_SIZE, MAIN_COLOR } from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: MAIN_COLOR,
        // tabBarActiveBackgroundColor: "#EAF2FF",
        tabBarBackground: () => (
          <View
            style={{ backgroundColor: "#494A50", minHeight: "100%" }}
          ></View>
        ),
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={ICON_SIZE} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout/index"
        options={{
          title: "Workout",
          tabBarIcon: ({ color }) => (
            <Ionicons name="barbell-sharp" color={color} size={ICON_SIZE} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="community/index"
        options={{
          title: "Community",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-sharp" color={color} size={ICON_SIZE} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={ICON_SIZE} />
          ),
        }}
      />
    </Tabs>
  );
}
