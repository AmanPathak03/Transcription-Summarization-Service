import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate(); 

  const handleSignup = async () => {
    
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) { 
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true); // Disable submit button during request

      const response = await axios.post("https://cdef-project.onrender.com/auth/register", null, {
        params: {
          name,
          email,
          password,
        },
      });

      if (response.status === 201) {
        // Signup successful
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
          navigate("/login"); // Navigate to login page after signup
        }, 3000);
      }
      
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);

      // Specific error handling based on status code or default message
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      
      if (error.response?.status === 400) {
        setErrorMessage("This email is already registered.");
      } else if (error.response?.status === 500) {
        setErrorMessage("Server error. Please try again later.");
      } else {
        setErrorMessage(message);
      }
      
    } finally {
      setIsSubmitting(false); // Re-enable submit button after request completes
    }
  };

  
  return (
    <div className="form-container">
      <p className="title">Sign Up</p>
      
      <form className="form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Disable button while submitting */}
        <button type="button" onClick={handleSignup} className="sign" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
        
      </form>

      {/* Link to login */}
      <p className="signup">
        Already have an account?{' '}
        <a href="/Login" className="signin">
          Log in
        </a>
      </p>

      {/* Pop-up for success message */}
      {isPopupVisible && (
        <div className="popup animated-popup">
          <p>Registered Successfully!</p>
          <span className="popup-icon">✔</span>
        </div>
      )}

      {/* Display error messages */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
    </div>
  );
};

export default Signup;