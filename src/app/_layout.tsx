import { Slot } from "expo-router";
import { FirebaseAuthProvider } from "../contexts/FirebaseAuthContext";

export default function RootLayout() {
  return (
    <FirebaseAuthProvider>
      <Slot />
    </FirebaseAuthProvider>
  );
}
