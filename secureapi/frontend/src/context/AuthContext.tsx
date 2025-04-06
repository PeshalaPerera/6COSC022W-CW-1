import React, { createContext, useContext, useEffect, useState } from "react";

interface UserType {
  email: string;
  username: string;
  api_key: string;
  [key: string]: any;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
  user: null,
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setTokenState(savedToken);
      fetchUser(savedToken);
    }
  }, []);

  const fetchUser = async (jwtToken: string) => {
    try {
      const res = await fetch("http://localhost:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!res.ok) throw new Error("User fetch failed");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user info", err);
      setUser(null);
    }
  };

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
      setTokenState(token);
      fetchUser(token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("api_key");
      setTokenState(null);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("api_key");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
