import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./registerPage.css"; 

const RegisterPage = () => {
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!shopName.trim()) {
      newErrors.shopName = "Please enter shop name";
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
  setErrors({});

  if (validateForm()) {
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shop_name: shopName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "User registered successfully!");
        navigate("/login"); 
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, please try again later.");
    }
  }
};


  const handleLogin = () => {
    navigate("/login"); 
  };

  
  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Your Shop Account</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Shop Name"
            value={shopName}
            onChange={(e) => {
              setShopName(e.target.value);
              clearError('shopName');
            }}
            className={errors.shopName ? "error" : ""}
          />
          {errors.shopName && <span className="error-message">{errors.shopName}</span>}
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError('email');
            }}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="input-group">
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError('password');
                
                if (e.target.value === confirmPassword && errors.confirmPassword) {
                  clearError('confirmPassword');
                }
              }}
              className={errors.password ? "error" : ""}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="input-group">
          <div className="password-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearError('confirmPassword');
                
                if (e.target.value === password && errors.confirmPassword) {
                  clearError('confirmPassword');
                }
              }}
              className={errors.confirmPassword ? "error" : ""}
            />
            <span className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <button className="register-btn" onClick={handleRegister}>Register</button>
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  ); 
};

export default RegisterPage;