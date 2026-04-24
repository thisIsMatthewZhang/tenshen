import DateCircle from "@/src/components/DateCircle";
import WorkoutHistory from "@/src/components/WorkoutHistory";
import { FONTS, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { useWeeklyDates } from "@/src/hooks/useWeeklyDates";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// const fireIcon = require("../../../assets/fire-icon.png");
import { firebaseConfigWeb } from "@/config/firebaseConfig";
import { User as AppUser } from "@/src/types/user";
import { getUserData } from "@/src/utils/getUserData";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useRef } from "react";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);
const db = getFirestore(app);

export default function Home() {
  const user = auth.currentUser!;
  const dates = useWeeklyDates();
  let appUserData: React.RefObject<
    | {
        [K in keyof AppUser]?: AppUser[K];
      }
    | null
  > = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData(user.uid, db);
      appUserData.current = { ...userData };
      return appUserData;
    }
    fetchData();
  }, [user.uid]);

  const userWorkoutHistory = appUserData.current?.workoutsFinished!;
  return (
    <SafeAreaProvider style={PATTERN.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.circleContainer}>
            {dates.map((day) => {
              return (
                <DateCircle
                  key={day.dayOfWeek}
                  dateOfWeek={day.dateOfWeek}
                  dayOfWeek={day.dayOfWeek}
                  isCurrentDay={day.isCurrentDay}
                />
              );
            })}
            <View style={styles.streak}>
              {/* <Image source={fireIcon} width={ICON_SIZE} height={ICON_SIZE} /> */}
              <Text
                style={{
                  color: MAIN_COLOR,
                  fontWeight: "semibold",
                  marginLeft: 4,
                }}
              >
                0
              </Text>
            </View>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={[styles.greetingText, { color: MAIN_COLOR }]}>
              Hey Matthew!{" "}
              <Text style={[styles.greetingText, { color: "white" }]}>
                You ready to start this workout journey together!? I know I am
                💪
              </Text>
            </Text>
          </View>
          <WorkoutHistory
            userName={
              appUserData.current?.name?.first +
              " " +
              appUserData.current?.name?.last
            }
            data={userWorkoutHistory}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  streak: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  greetingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  greetingText: {
    ...FONTS,
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
});
