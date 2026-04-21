import { doc, Firestore, getDoc } from "firebase/firestore";

export async function getUserData(uid: string, db: Firestore) {
  try {
    const userData = await getDoc(doc(db, "users", uid));
    if (!userData.exists()) throw new Error("User data could not be found. ");
    return userData.data();
  } catch (error) {
    console.error(error);
    return null;
  }
}
