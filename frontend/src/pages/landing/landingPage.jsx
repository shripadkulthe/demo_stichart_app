import React from "react";
import "./landingPage.css";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <div className="content">
        <h1 className="tagline">Where Every Thread Tells a Story</h1>
        <p className="subtitle">The Perfect Fit, Every Time</p>
        <button
          className="landing-btn"
          onClick={() => navigate("/register")}
        >
          <span>Get Started</span>
          <FiArrowRight className="arrow" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
