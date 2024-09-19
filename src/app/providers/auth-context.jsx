import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/services/firebase/config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    if (!loading && !currentUser) {
      if (pathname !== "/") {
        router.push("/login");
      }
    }
  }, [currentUser, loading, pathname, router]);

  const value = {
    currentUser,
    loading,
    logout,
  };

  if (loading) {
    return (
      <AuthContext.Provider value={value}>
        <div className="w-full min-h-screen items-center justify-center flex flex-col gap-2 bg-slate-950 text-white">
          <h2 className="font-bold text-2xl text-center">Carregando...</h2>
        </div>
      </AuthContext.Provider>
    );
  }

  if (!loading && !currentUser && pathname !== "/" && pathname !== "/login") {
    return (
      <AuthContext.Provider value={value}>
        <div className="w-full min-h-screen items-center justify-center flex flex-col gap-2 bg-slate-900 text-white">
          <h2 className="font-bold text-2xl text-center">
            Você não está autenticado!
          </h2>
          <p className="text-center">Redirecionando...</p>
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
