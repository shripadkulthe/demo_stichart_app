import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./loginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please enter email address";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Please enter password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setErrors({});

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message || "Login successful!");
          // Store token in localStorage or context
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
          }
          navigate("/"); // Redirect to home/dashboard
        } else {
          alert(data.message || "Invalid email or password");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Server error, please try again later.");
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Your Shop</h2>

        <div className="login-input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError('email');
            }}
            className={errors.email ? "login-error" : ""}
          />
          {errors.email && <span className="login-error-message">{errors.email}</span>}
        </div>

        <div className="login-input-group">
          <div className="login-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError('password');
              }}
              className={errors.password ? "login-error" : ""}
            />
            <span className="login-eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {errors.password && <span className="login-error-message">{errors.password}</span>}
        </div>

        <button className="login-btn" onClick={handleLogin}>Login</button>

        <div className="login-register-link">
          Not registered yet? <span onClick={handleRegister}>Create an account</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;