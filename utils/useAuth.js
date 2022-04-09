import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./supabase";

const initialState = { session: null, user: null, loading: true };
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setAuth({ user: session.user, session, loading: false });
    } else {
      setAuth({ ...initialState, loading: false });
    }
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setAuth({ user: session.user, session, loading: false });
      } else {
        setAuth({ ...initialState, loading: false });
      }
    });
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
export default useAuth;
