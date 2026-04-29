import { firebaseConfigWeb } from "@/config/firebaseConfig";
import AppButton from "@/src/components/AppButton";
import ExperienceBar, {
  calculateExpPointsEarned,
  getUserCurrentLevel,
  getUserExpProgress,
} from "@/src/components/ExperienceBar";
import { BLUE_DARKER, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { WorkoutsContext } from "@/src/contexts/WorkoutsContext";
import {
  FirebaseFinishedWorkout,
  Time,
} from "@/src/types/firebaseFinishedWorkout";
import { useLocalSearchParams, useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  doc,
  getFirestore,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useMemo, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

interface BlockProps {
  value: number | string;
  category: "Exercises" | "Sets" | "Workout Time" | "Streak🔥";
}
const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);
const db = getFirestore(app);

const Block = ({ value, category }: BlockProps) => {
  return (
    <View style={styles.block}>
      <Text style={[PATTERN.mediumText, { fontWeight: "bold" }]}>{value}</Text>
      <Text
        style={[PATTERN.smallText, { color: MAIN_COLOR, fontWeight: "bold" }]}
      >
        {category}
      </Text>
    </View>
  );
};

export default function WorkoutComplete() {
  const user = auth.currentUser!;
  const userDocRef = doc(db, "users", user.uid);
  const router = useRouter();
  const radioButtons: RadioButtonProps[] = useMemo(() => {
    const containerStyle: StyleProp<ViewStyle> = {
      width: "100%",
      justifyContent: "space-between",
    };
    const descriptionStyle: StyleProp<TextStyle> = {
      ...PATTERN.smallText,
      fontSize: 14,
      color: "white",
      opacity: 0.5,
      alignSelf: "flex-end",
      paddingRight: 12,
    };
    return [
      {
        id: "1",
        label: "Public",
        description: "Everyone can see this workout",
        descriptionStyle: descriptionStyle,
        value: "public",
        containerStyle: containerStyle,
        color: BLUE_DARKER,
        selected: true,
      },
      {
        id: "2",
        label: "Private",
        description: "Only you can see this workout",
        descriptionStyle: descriptionStyle,
        value: "private",
        containerStyle: containerStyle,
        color: BLUE_DARKER,
        selected: false,
      },
    ];
  }, []);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [workoutsContext] = useContext(WorkoutsContext);
  const params = useLocalSearchParams<{
    workoutId: string;
    workoutName: string;
    exercisesCompleted: string;
    setsCompleted: string;
    time: string;
    streak: string;
  }>();
  const date = new Date();
  const originalWorkout = workoutsContext.find(
    (workout) => workout.id === params.workoutId,
  )!;
  const workout = {
    id: originalWorkout.id,
    name: originalWorkout.name,
    exercises: originalWorkout.exercises,
  };
  const finishedWorkout: FirebaseFinishedWorkout = {
    ...workout,
    duration: params.time as Time,
    finishedAt: new Timestamp(
      date.getSeconds(),
      date.getMilliseconds() * 1000000,
    ),
  };

  const expGainedFactors = {
    // time: params.time,
    exercises: params.exercisesCompleted,
    sets: params.setsCompleted,
    streak: params.streak,
  };

  return (
    <View style={[PATTERN.container, { justifyContent: "space-around" }]}>
      <View style={styles.topContainer}>
        <ExperienceBar
          expGained={calculateExpPointsEarned(expGainedFactors, 3.6)}
          userExpProgress={getUserExpProgress(0)}
          userCurrentLevel={getUserCurrentLevel(0)}
          barColor={MAIN_COLOR}
          textColor={MAIN_COLOR}
        />
        <View style={styles.textHeaderContainer}>
          <Text style={[PATTERN.bigText, { fontWeight: "bold" }]}>
            Good stuff, <Text style={{ color: MAIN_COLOR }}>Matthew!</Text>🤩
          </Text>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.partnerContainer}></View>
          <View style={styles.blocksContainer}>
            <Block value={params.exercisesCompleted} category="Exercises" />
            <Block value={params.setsCompleted} category="Sets" />
            <Block value={params.time} category="Workout Time" />
            <Block value={params.streak} category="Streak🔥" />
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          containerStyle={{ marginBottom: 32 }}
          labelStyle={[PATTERN.mediumText, { fontWeight: "bold" }]}
        />
        <View style={styles.buttonsContainer}>
          <AppButton
            title="Discard Activity"
            bgColor="red"
            textColor="black"
            onPress={() => {
              router.push("/home");
            }}
            customStyle={{ flex: 1 }}
          />
          <AppButton
            title="Save Activity"
            bgColor={MAIN_COLOR}
            textColor="black"
            onPress={async () => {
              await updateDoc(userDocRef, {
                workoutsFinished: arrayUnion(finishedWorkout),
              });
              router.navigate("/home");
            }}
            customStyle={{ flex: 1, marginLeft: 12 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: { alignItems: "center", paddingHorizontal: 16 },

  textHeaderContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 12,
  },
  partnerContainer: { flex: 1 },
  blocksContainer: { flex: 1 },
  block: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    padding: 16,
  },
  //   input: {
  //     width: "100%",
  //     color: "white",
  //     textAlignVertical: "top",
  //     // justifyContent: "flex-start",
  //     borderWidth: 2,
  //     borderRadius: 10,
  //     borderColor: "white",
  //     padding: 12,
  //     marginBottom: 12,
  //   },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
