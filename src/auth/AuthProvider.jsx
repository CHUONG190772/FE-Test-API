import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Đọc thông tin người dùng từ localStorage khi app load
    try {
      const token = localStorage.getItem("token");
      const userJSON = localStorage.getItem("user");
      if (token && userJSON) {
        setUser(JSON.parse(userJSON));
      }
    } catch (error) {
      console.error("AuthProvider init error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await authService.login({ username, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return res;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
