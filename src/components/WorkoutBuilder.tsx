import { firebaseConfigWeb } from "@/config/firebaseConfig";
import ExerciseCard from "@/src/components/ExerciseCard";
import ReusableModal, {
  ReusableModalProps,
} from "@/src/components/ReusableModal";
import {
  BLUE_DARKER,
  BLUE_LIGHTER,
  MAX_INPUT_LENGTH,
  PATTERN,
} from "@/src/constants/theme";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentReference,
  getFirestore,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { ExerciseContext } from "../contexts/ExerciseContext";
import { WorkoutsContext } from "../contexts/WorkoutsContext";
import { FirebaseExercise } from "../types/firebaseexercise";
import { FirebaseWorkout } from "../types/firebaseworkout";
import { data } from "../utils/exercises";
import AppButton from "./AppButton";
import SearchFilterModal from "./SearchFilterModal";
// const ruby = require("../../../../assets/avatars/Ruby.png");

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);
const db = getFirestore(app);
let userDocRef: DocumentReference;
onAuthStateChanged(auth, (user) => {
  if (user) {
    userDocRef = doc(db, "users", user.uid);
  }
});

interface BuilderProps {
  type?: "create" | "edit";
  workoutId: undefined | string;
  workoutName: string;
}

export default function WorkoutBuilder({
  type = "create",
  workoutId = undefined,
  workoutName: workoutNameProp,
  showModal,
  setShowModal,
}: ReusableModalProps & BuilderProps) {
  const [workoutName, setWorkoutName] = useState<string>(workoutNameProp || "");
  const [exercises, setExercises] = useContext(ExerciseContext);
  const [showSearchExerciseModal, setShowSearchExerciseModal] =
    useState<boolean>(false);
  const [workouts, setWorkouts] = useContext(WorkoutsContext);
  let disableDoneButton =
    !exercises.every((ex) => ex.sets.length) ||
    !exercises.length ||
    !workoutName;
  const firebaseExercises: FirebaseExercise[] = exercises.map((ex) => {
    return {
      ...ex,
      sets: ex.sets.map((s) => ({
        id: s.id,
        setNumber: s.setNumber,
        weight: s.weight,
        reps: s.reps,
      })),
    };
  });

  return (
    <ReusableModal
      showModal={showModal}
      setShowModal={() => setShowModal(!showModal)}
    >
      <View style={PATTERN.container}>
        <View style={styles.headerContainer}>
          <View style={styles.topButtons}>
            <AppButton
              title="Cancel"
              bgColor="red"
              textColor="black"
              onPress={() => {
                setExercises([]);
                setShowModal(!showModal);
                setWorkoutName("");
              }}
              customStyle={{ margin: 8 }}
            />
            <AppButton
              title="Done 👍"
              bgColor={BLUE_LIGHTER}
              textColor="white"
              onPress={async () => {
                const workoutId = uuid.v4();
                const date: Date = new Date();
                const timeStamp = new Timestamp(
                  date.getSeconds(),
                  date.getMilliseconds() * 1000000,
                );
                const newFirebaseWorkout: FirebaseWorkout = {
                  id: workoutId,
                  name: workoutName,
                  exercises: firebaseExercises,
                  savedAt: timeStamp,
                };
                setWorkouts([newFirebaseWorkout, ...workouts]);
                setWorkoutName("");
                setExercises([]);
                setShowModal(!showModal);
                if (type === "edit") {
                  // remove old workout from server first
                  const oldFirebaseWorkout = workouts.find(
                    (workout) => workout.id === workoutId,
                  );
                  await updateDoc(userDocRef, {
                    workoutsSaved: arrayRemove(oldFirebaseWorkout),
                  });
                }
                await updateDoc(userDocRef, {
                  workoutsSaved: arrayUnion(newFirebaseWorkout),
                });
              }}
              customStyle={({ pressed }) => {
                return {
                  backgroundColor: pressed ? BLUE_DARKER : BLUE_LIGHTER,
                  opacity: disableDoneButton ? 0.5 : 1,
                  margin: 8,
                };
              }}
              pressableProps={{
                disabled: disableDoneButton,
              }}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Workout Name"
            placeholderTextColor={"white"}
            maxLength={MAX_INPUT_LENGTH}
            value={workoutName}
            onChangeText={(text) => setWorkoutName(text)}
          />
        </View>
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {!exercises.length ? (
            <View style={styles.emptyState}>
              {/* <Image source={ruby} style={{ width: 25, height: 25 }} /> */}
              <Text style={PATTERN.bigText}>
                Ready to build a workout routine? Let&apos;s get started!
              </Text>
            </View>
          ) : (
            exercises.map((item) => {
              return (
                <ExerciseCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  primary={item.primary}
                  secondary={null}
                  riveUrl=""
                  equipment={item.equipment}
                  isSelected
                  sets={item.sets}
                />
              );
            })
          )}
        </ScrollView>
        <View style={styles.footerContainer}>
          <AppButton
            title="Add Exercise +"
            bgColor={BLUE_LIGHTER}
            textColor="white"
            onPress={() => {
              setShowSearchExerciseModal(!showSearchExerciseModal);
            }}
            customStyle={{ width: "90%", margin: 8 }}
          />
        </View>
        {showSearchExerciseModal ? (
          <SearchFilterModal
            data={data}
            showModal={showSearchExerciseModal}
            setShowModal={setShowSearchExerciseModal}
          />
        ) : (
          <></>
        )}
      </View>
    </ReusableModal>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 60,
  },
  input: {
    width: "85%",
    fontSize: 24,
    color: "white",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 12,
    marginVertical: 12,
  },
  topButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 28,
  },
  emptyState: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },

  cardsContainer: { width: "100%", alignItems: "center" },
});
