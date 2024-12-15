import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; 
import { auth, provider } from "./config"; 
import { signInWithPopup } from "firebase/auth";
import { assets } from "../../Assets/assets"; 
import "./Login.css";

const Login = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setEmail(data.user.email);
      localStorage.setItem("email", data.user.email); 
      navigate("/main");
      navigate("/sidebar"); 
    })
    .catch((error) => {
      console.error("Google sign-in failed:", error);
      alert("Google sign-in failed");
    });
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    setEmail(savedEmail || ""); // Default to an empty string if null
  }, []);

  const handleLogin = async () => {
    try {
      setIsSubmitting(true);
      const success = await login(email, password); 
      if (success) {
        navigate("/main");
        navigate("/sidebar"); 
      } else {
        alert("Invalid credentials"); 
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login.");
    }
  };

  const navigateToSignup = () => {
    console.log("Navigating to Signup page");
    navigate("/Signup"); 
  };

  return (
    <div className="form-container">
      <p className="title">Login</p>
      <form className="form">
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleLogin} className="sign" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div className="social-message">
        <div className="line" />
        <p className="message">Login with Google</p>
        <div className="line" />
      </div>
      <div className="social-icons">
        <button
          aria-label="Log in with Google"
          className="icon"
          onClick={loginWithGoogle}
        >
          <img src={assets.google} alt="Google" />
        </button>
      </div>
      <p className="signup">
        Don't have an account?{" "}
        <button type="button" className="signin" onClick={navigateToSignup}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
