import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import app from '../services/AuthFirebase';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

interface AuthProps {
  user: User | null;
  logOut: () => void;
}

const AuthContext = createContext<AuthProps>({} as AuthProps);

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = getAuth(app).onAuthStateChanged(user => {
      setUser(user as User);
    });
    return subscriber;
  }, []);

  function logOut() {
    getAuth(app).signOut();
  }

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default { AuthContext, useAuth };
