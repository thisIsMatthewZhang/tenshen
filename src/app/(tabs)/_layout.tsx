import { firebaseConfigWeb } from "@/config/firebaseConfig";
import { ICON_SIZE, MAIN_COLOR } from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { View } from "react-native";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);

export default function TabLayout() {
  const user = auth.currentUser!;
  const isVerified = user.emailVerified;
  return (
    <Tabs
      detachInactiveScreens={false}
      screenOptions={{
        tabBarActiveTintColor: MAIN_COLOR,
        // tabBarActiveBackgroundColor: "#EAF2FF",
        tabBarBackground: () => (
          <View style={{ backgroundColor: "#494A50", minHeight: "100%" }} />
        ),
      }}
    >
      <Tabs.Protected guard={isVerified}>
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            animation: "shift",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" color={color} size={ICON_SIZE} />
            ),
          }}
        />
        <Tabs.Screen
          name="workout/index"
          options={{
            animation: "shift",

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
            animation: "shift",

            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" color={color} size={ICON_SIZE} />
            ),
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
