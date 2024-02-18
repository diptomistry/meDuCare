// Home.js

import React, { useState } from "react";
import Logo from "./assets/logo.png";
import MeducareImage from "./assets/meducare.png";
import "./style/home.css";

function Home() {
  const [popupContent, setPopupContent] = useState(null);

  const handleButtonClick = (content) => {
    setPopupContent(content);
  };

  const closePopup = () => {
    setPopupContent(null);
  };

  return (
    <div className="home">
      <header className="top-bar">
        <div className="top-bar-content">
          <div className="logo-container">
            <img src={Logo} alt="Meducare Logo" className="home-logo" />
            <p className="university-text">UNIVERSITY OF DHAKA</p>
          </div>
          <div className="center-text">
            <p>Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre</p>
          </div>
          <button className="login-button">Login</button>
        </div>
      </header>

      <img src={MeducareImage} alt="Meducare" style={{ width: "100%" }} />

      <div className="spacing"></div>
      <div className="button-column">
        <button onClick={() => handleButtonClick("About Details")}>
          About
        </button>
        <button onClick={() => handleButtonClick("People Details")}>
          People
        </button>
        <button onClick={() => handleButtonClick("Contact Details")}>
          Contact
        </button>
      </div>

      {popupContent && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <p>{popupContent}</p>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; 2024 Meducare. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
