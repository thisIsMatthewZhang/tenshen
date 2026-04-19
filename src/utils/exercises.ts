import { firebaseConfigWeb } from "@/config/firebaseConfig";
import { Exercise } from "@/src/types/exercise";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ExerciseCard } from "../types/exercisecard";

const app = initializeApp(firebaseConfigWeb);
const db = getFirestore(app);
const collectionRef = collection(db, "exercises");
export let exercises: Exercise[];
export let data: ExerciseCard[];
(async () => await getDocs(collectionRef))().then((snapshot) => {
  const exerciseArray = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Exercise[];

  const exerciseCardsArray: ExerciseCard[] = exerciseArray.map((data) => ({
    sets: [],
    isSelected: false,
    ...data,
  }));
  exercises = [...exerciseArray];
  data = [...exerciseCardsArray]; // data that is used throughout routes
});
