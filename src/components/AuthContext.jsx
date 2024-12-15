import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store the user's information

  const login = async (email, password) => {
    try {
      console.log("Sending data to server:", { email, password });
  
      const data = new URLSearchParams();
      data.append("grant_type", "password");
      data.append("username", email);
      data.append("password", password);
      data.append("scope", "");
      data.append("client_id", "");
      data.append("client_secret", "");
  
      const response = await axios.post("https://cdef-project.onrender.com/auth/login", data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    console.log("Response from server:", response.data);
    if (response.status === 200) {
      setIsAuthenticated(true);
      setUser({ email }); // Store the user's email
      return true;
    }
  } catch (error) {
      console.error("Login failed", error);
      return false;
    }
};

  const signup = async (email, password, name) => {
    try {
      const response = await axios.post("https://cdef-project.onrender.com/auth/register", {
        name,
        email,
        password,
      });
      return response.status === 200;
    } catch (error) {
      console.error("Signup failed", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};
