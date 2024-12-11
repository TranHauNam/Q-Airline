import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserID(data.sub);
        setIsLoggedIn(true);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID("");
    sessionStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userID, setIsLoggedIn, setUserID, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
