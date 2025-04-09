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
  refreshUsage: () => void;
  usage: any[];
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
  user: null,
  setUser: () => {},
  refreshUsage: () => {},
  usage: [],
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [usage, setUsage] = useState<any[]>([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setTokenState(savedToken);
      fetchUser(savedToken);
      refreshUsage(savedToken);
    }
  }, []);

  const baseUrl = import.meta.env.VITE_BASE_URL

  const fetchUser = async (jwtToken: string) => {
    try {
      const res = await fetch(`${baseUrl}/auth/me`, {
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

  const refreshUsage = async (tokenParam?: string) => {
    const jwtToken = tokenParam || token;
    if (!jwtToken) return;

    const baseUrl = import.meta.env.VITE_BASE_URL

    try {
      const res = await fetch(`${baseUrl}/auth/usage`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch usage");
      const data = await res.json();
      setUsage([
        {
          endpoint: "/countries",
          method: "GET",
          usageCount: data.usage_count,
          lastUsedTimestamp: data.last_used,
        },
      ]);
    } catch (err) {
      console.error("Usage fetch failed", err);
    }
  };

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
      setTokenState(token);
      fetchUser(token);
      refreshUsage(token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("api_key");
      setTokenState(null);
      setUser(null);
      setUsage([]);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("api_key");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, logout, user, setUser, refreshUsage, usage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
