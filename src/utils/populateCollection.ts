import { FirebaseOptions, initializeApp } from "firebase/app";
import {
    doc,
    DocumentData,
    getFirestore,
    setDoc,
    WithFieldValue,
} from "firebase/firestore";

/**
 * Script to populate a collection with predefined data
 * @param data : predefined data to populate server collection with
 * @param config : Firebase config object
 * @param collectionPath : absolute path to collection
 */
export async function populateFirebaseCollection<
  T extends WithFieldValue<DocumentData>,
>(
  data: T[],
  config: FirebaseOptions,
  collectionPath: string,
): Promise<boolean> {
  try {
    const app = initializeApp(config);
    const db = getFirestore(app);
    data.forEach(async (value, index) => {
      const docRef = doc(db, collectionPath, String(index));
      await setDoc(docRef, value);
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
