import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Context object
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Check for an existing token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  //  Login function
  const login = async (credentials) => {
    /*  try {
      // Replace with your actual API endpoint
      const response = await fetch("https://your-api.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user); // Store user info in state
        return data;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      throw error;
    }*/
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

// 5. Custom hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
