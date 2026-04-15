import { firebaseConfigWeb } from "@/config/firebaseConfig";
import {
  APP_BACKGROUND_COLOR,
  BLUE_LIGHTER,
  ICON_SIZE,
  PATTERN,
} from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  arrayRemove,
  doc,
  DocumentReference,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { WorkoutsContext } from "../contexts/WorkoutsContext";
import { Workout } from "../types/workout";
import AppButton from "./AppButton";
import ReusableModal from "./ReusableModal";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);
const db = getFirestore(app);
let appUser: User | null;
let appUserDocRef: DocumentReference | null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    appUser = user;
    appUserDocRef = doc(db, "users", appUser.uid);
  }
});

export default function WorkoutCardExtraOptions({
  id,
  name,
  exercises,
}: Workout) {
  const [workoutOptionsModal, setWorkoutOptionsModal] = useState(false);
  const [confirmDeleteWorkoutModal, setConfirmDeleteWorkoutModal] =
    useState(false);
  const [workouts, setWorkouts] = useContext(WorkoutsContext);
  return (
    <Pressable onPress={() => setWorkoutOptionsModal(!workoutOptionsModal)}>
      <Ionicons
        style={{ position: "absolute", alignSelf: "flex-end", bottom: 0 }}
        name="ellipsis-vertical"
        size={ICON_SIZE}
      />
      <ReusableModal
        showModal={confirmDeleteWorkoutModal}
        setShowModal={setConfirmDeleteWorkoutModal}
        modalProps={{
          animationType: "fade",
          allowSwipeDismissal: false,
          transparent: true,
        }}
      >
        <View style={styles.deleteWorkoutModalBgView}>
          <View style={styles.deleteWorkoutModalInnerView}>
            <Text style={PATTERN.smallText}>
              Are you sure you want to delete this workout?
            </Text>
            <View style={styles.btnOptions}>
              <AppButton
                title="Cancel"
                bgColor="red"
                textColor="black"
                onPress={() => {
                  setConfirmDeleteWorkoutModal(false);
                }}
                textStyle={{ fontWeight: "bold" }}
                customStyle={{
                  width: "50%",
                  borderRadius: 0,
                  borderBottomStartRadius: 20,
                }}
              />
              <AppButton
                title="Confirm"
                bgColor={BLUE_LIGHTER}
                textColor="white"
                onPress={() => {
                  const workoutToDelete: Workout = workouts.find(
                    (workout) => workout.id === id,
                  )!;
                  setWorkouts(
                    workouts.filter(
                      (workout) => workout.id !== workoutToDelete.id,
                    ),
                  );
                  updateDoc(appUserDocRef!, {
                    workoutsSaved: arrayRemove({ ...workoutToDelete }),
                  });
                  setConfirmDeleteWorkoutModal(false);
                  setWorkoutOptionsModal(false);
                }}
                textStyle={{ fontWeight: "bold" }}
                customStyle={{
                  width: "50%",
                  borderRadius: 0,
                  borderBottomEndRadius: 20,
                }}
              />
            </View>
          </View>
        </View>
      </ReusableModal>
      <Modal
        animationType="slide"
        visible={workoutOptionsModal}
        transparent={true}
        onRequestClose={() => {
          setWorkoutOptionsModal(false);
        }}
        allowSwipeDismissal={true}
      >
        <Pressable
          onPress={() => setWorkoutOptionsModal(false)}
          style={styles.outerView}
        >
          <Pressable style={styles.innerView}>
            <View style={styles.header}>
              <Text style={[PATTERN.mediumText, { textAlign: "center" }]}>
                {name}
              </Text>
              <Pressable
                onPress={() => setWorkoutOptionsModal(false)}
                style={{ marginHorizontal: 12 }}
              >
                <Ionicons name="close-sharp" size={ICON_SIZE} color={"white"} />
              </Pressable>
            </View>
            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons
                name="swap-horizontal-sharp"
                size={ICON_SIZE}
                color="white"
              />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Replace Workout
              </Text>
            </Pressable>

            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons name="pencil-sharp" size={ICON_SIZE} color="white" />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Edit Workout
              </Text>
            </Pressable>

            <View style={PATTERN.separator} />

            <Pressable style={styles.option}>
              <Ionicons name="share-sharp" size={ICON_SIZE} color="white" />
              <Text style={[PATTERN.smallText, { marginHorizontal: 8 }]}>
                Share Workout
              </Text>
            </Pressable>

            <View style={PATTERN.separator} />

            <Pressable
              style={styles.option}
              onPress={() => {
                setConfirmDeleteWorkoutModal(true);
              }}
            >
              <Ionicons
                name="remove-circle-sharp"
                size={ICON_SIZE}
                color="red"
              />
              <Text
                style={[
                  PATTERN.smallText,
                  { marginHorizontal: 8, color: "red" },
                ]}
              >
                Delete Workout
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: APP_BACKGROUND_COLOR,
    opacity: 0.95,
  },
  innerView: {
    width: "100%",
    height: 325,
    backgroundColor: "black",
    paddingVertical: 12,
  },
  header: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-end",
  },
  option: {
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  deleteWorkoutModalBgView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: APP_BACKGROUND_COLOR,
    opacity: 0.95,
  },
  deleteWorkoutModalInnerView: {
    width: "75%",
    height: 125,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderRadius: 20,
    paddingTop: 20,
  },
  btnOptions: {
    width: "100%",
    flexDirection: "row",
  },
});
