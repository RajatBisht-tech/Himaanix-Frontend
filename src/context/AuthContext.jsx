import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const readStoredUser = () => {
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    return null;
  }
};

const getStoredToken = () => {
  const token =
    localStorage.getItem("himaanix_token") ||
    sessionStorage.getItem("himaanix_token");
  if (token) return token;

  const storage = localStorage.getItem("token")
    ? localStorage
    : sessionStorage.getItem("token")
      ? sessionStorage
      : null;
  const legacyToken = storage?.getItem("token");

  if (legacyToken && storage) {
    storage.setItem("himaanix_token", legacyToken);
    storage.removeItem("token");
  }

  return legacyToken;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken);
  const [user, setUser] = useState(readStoredUser);

  const signIn = (nextToken, nextUser, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    const otherStorage = rememberMe ? sessionStorage : localStorage;

    otherStorage.removeItem("himaanix_token");
    otherStorage.removeItem("token");
    otherStorage.removeItem("user");
    storage.setItem("himaanix_token", nextToken);
    storage.setItem("user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const signOut = () => {
    localStorage.removeItem("himaanix_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("himaanix_token");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, signIn, signOut }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
