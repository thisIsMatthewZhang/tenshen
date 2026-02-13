import ProfilePhoto from "@/src/components/ProfilePhoto";
import WorkoutHistory from "@/src/components/WorkoutHistory";
import { ICON_SIZE, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentPropsWithoutRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface CounterProps {
  title?: string;
  count: number;
}

interface DashboardButtonProps {
  title: string;
  icon: ComponentPropsWithoutRef<typeof Ionicons>["name"];
}

export default function ProfileScreen() {
  const Counter = ({ title, count }: CounterProps) => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={[PATTERN.smallText, { fontWeight: "bold" }]}>{title}</Text>
        <Text style={PATTERN.smallText}>{count}</Text>
      </View>
    );
  };
  const DashboardButton = ({ title, icon }: DashboardButtonProps) => {
    return (
      <Pressable style={[PATTERN.center, styles.dashboardBtn]}>
        <Ionicons name={icon} size={ICON_SIZE} />
        <Text
          style={[
            PATTERN.smallText,
            { fontWeight: "bold", color: "black", marginHorizontal: 4 },
          ]}
        >
          {title}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={PATTERN.container}>
        <ScrollView
          contentContainerStyle={{
            minWidth: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
          }}
        >
          <View style={styles.settings}>
            <Ionicons
              name="settings-sharp"
              size={ICON_SIZE}
              color={MAIN_COLOR}
            />
          </View>
          <View style={PATTERN.center}>
            <Pressable
              style={({ pressed }) => {
                return { opacity: pressed ? 0.5 : 1 };
              }}
            >
              <ProfilePhoto scale={0.2} />
              <View
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: MAIN_COLOR,
                  borderRadius: 20,
                  padding: 4,
                  bottom: "25%",
                }}
              >
                <Ionicons
                  name="pencil-sharp"
                  size={ICON_SIZE - 12}
                  color="black"
                />
              </View>
            </Pressable>
            <Text
              style={[PATTERN.mediumText, { fontWeight: "bold", marginTop: 8 }]}
            >
              Matthew Zhang
            </Text>
            <Text style={[PATTERN.smallText, { opacity: 0.5 }]}>
              zhangmatt22
            </Text>
          </View>
          <View style={styles.counters}>
            <Counter title="Workouts" count={0} />
            <Counter title="Followers" count={0} />
            <Counter title="Following" count={0} />
          </View>
          <View style={styles.header}>
            <View>
              <Text
                style={[
                  PATTERN.smallText,
                  { fontWeight: "bold", marginLeft: 16 },
                ]}
              >
                Dashboard
              </Text>
              <View style={[PATTERN.separator, { marginVertical: 4 }]} />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 16,
              }}
            >
              <DashboardButton title="Statistics" icon="stats-chart" />
              <DashboardButton title="Body" icon="body" />
              <DashboardButton title="Calendar" icon="calendar" />
            </View>
          </View>

          <View style={styles.header}>
            <View>
              <Text
                style={[
                  PATTERN.smallText,
                  { fontWeight: "bold", marginLeft: 16 },
                ]}
              >
                Workout History
              </Text>
              <View style={[PATTERN.separator, { marginVertical: 4 }]} />
            </View>
            <WorkoutHistory />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  settings: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  header: { width: "100%" },
  dashboardBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: MAIN_COLOR,
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 8,
  },
  counters: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
});
