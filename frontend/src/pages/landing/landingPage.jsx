import React from "react";
import "./landingPage.css";
import { FiArrowRight } from "react-icons/fi";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="content">
        <h1 className="tagline">Where Every Thread Tells a Story</h1>
        <p className="subtitle">Your Vision, Our Stitches</p>
        <button
          className="landing-btn"
          onClick={() => alert("Let's get started!")}
        >
          <span>Get Started</span>
          <FiArrowRight className="arrow" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
