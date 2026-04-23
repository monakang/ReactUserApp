import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Context object
const AuthContext = createContext(null);

export const AuthProvider = ({ children, storageKey = "token" }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Check for an existing token
  useEffect(() => {
    const savedToken = localStorage.getItem(storageKey);
    if (savedToken) {
      // In a real app, you might want to validate the token with an API here
      setUser({ token: savedToken });
    }
    setLoading(false);
  }, [storageKey]);

  //  Login function
  const login = async (credentials) => {
    // Simulate network delay (1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dummy logic: Accept any login where the password is "password123"

    if (credentials.password === "password123") {
      const dummyData = {
        token: "fake-jwt-token-12345",
        user: { name: "Test User", email: credentials.email },
      };

      localStorage.setItem("token", dummyData.token);
      setUser(dummyData.user);

      return dummyData;
    } else {
      // Simulate a 401 Unauthorized error
      throw new Error("Invalid credentials. Try password123");
    }
  };

  //  Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
