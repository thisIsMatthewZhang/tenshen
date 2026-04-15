import { firebaseConfigWeb } from "@/config/firebaseConfig";
import { ICON_SIZE, MAIN_COLOR } from "@/src/constants/theme";
import { ExerciseContext } from "@/src/contexts/ExerciseContext";
import { WorkoutsContext } from "@/src/contexts/WorkoutsContext";
import { ExerciseCard } from "@/src/types/exercisecard";
import { User as AppUser } from "@/src/types/user";
import { Workout } from "@/src/types/workout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { View } from "react-native";
import { getUserData } from "./profile";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);
const db = getFirestore(app);
let appUserData: {
  [K in keyof AppUser]?: AppUser[K];
} = {};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await getUserData(user.uid, db);
    appUserData = { ...userData };
  }
});

export default function TabLayout() {
  const [exercises, setExercises] = useState<ExerciseCard[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>(
    appUserData.workoutsSaved!,
  );
  const user = auth.currentUser!;
  const isVerified = user.emailVerified;
  return (
    <WorkoutsContext.Provider value={[workouts, setWorkouts]}>
      <ExerciseContext.Provider value={[exercises, setExercises]}>
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
                  <Ionicons
                    name="barbell-sharp"
                    color={color}
                    size={ICON_SIZE}
                  />
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
      </ExerciseContext.Provider>
    </WorkoutsContext.Provider>
  );
}
