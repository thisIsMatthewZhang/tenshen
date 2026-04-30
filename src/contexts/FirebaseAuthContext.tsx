import { firebaseConfigWeb } from "@/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);

type ContextState = { user: User | null };

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

export function FirebaseAuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const value = { user };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider",
    );
  }
  return context.user;
}
