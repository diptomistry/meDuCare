import Logo from "./assets/logo.png";
import React, { useState, useEffect } from "react";

import styles, { layout } from "./style";
import "./css_style/home.css";
import { medicalCenterContent } from "./constants";
import DoctorCard from "./home/doctorcard"; // Use correct case
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
  const [activeButton, setActiveButton] = useState("about");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors' data when the component mounts
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/doctor/");
        setDoctors(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []); //

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const renderContent = () => {
    const boxStyle = {
      height: "50vh", // 50% of the viewport height
      marginLeft: "5vw", // 5% of the viewport width
      marginRight: "5vw", // 5% of the viewport width
      marginTop: "2.5vh", // 2.5% of the viewport height
      ///  border: "0.25vw solid #339d33", // 0.25% of the viewport width for border width
      borderRadius: "0.5vw", // 0.5% of the viewport width for border radius
      overflowY: "auto", // Add this line to enable vertical scrolling
      // Add box shadow with gray color
      boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2)",
    };

    const contentWrapperStyle = {
      maxHeight: "calc(50vh - 4rem)", // Adjust this value based on your padding and margin requirements
      padding: "1rem", // Add some padding for better readability
    };

    switch (activeButton) {
      case "about":
        return (
          <div
            style={boxStyle}
            className=" border-gray-200 bg-white rounded-lg"
          >
            <div style={contentWrapperStyle}>
              <h2 className={`${styles.heading2} sm:text-lg md:text-xl `}>
                {medicalCenterContent[1].title}
              </h2>
              <p
                className={`${styles.paragraph} mb-4 sm:text-sm md:text-base leading-tight`}
              >
                {medicalCenterContent[0].paragraph}
              </p>
              <p
                className={`${styles.paragraph} sm:text-sm md:text-base leading-tight`}
              >
                {medicalCenterContent[1].paragraph}
              </p>
            </div>
          </div>
        );
      case "people":
        return (
          <div
            className={` ${layout.sectionPeople}`}
            style={{
              marginLeft: "170px",
              marginTop: "50px",
              marginRight: "170px",
            }}
          >
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="w-80 bg-black p-4 rounded-lg shadow-md "
              >
                <DoctorCard {...doctor} />
              </div>
            ))}
          </div>
        );
      case "contact":
        return (
          <div
            style={boxStyle}
            className="bg-white border-gray-200  p-8 rounded-lg"
          >
            <h2 className={styles.heading2}>Contact</h2>

            <p className={styles.paragraph}>
              {medicalCenterContent[2].paragraph[0]}
              <br />
              {medicalCenterContent[2].paragraph[1]}
              <br />
              {medicalCenterContent[2].paragraph[2]}
              <br />
              {medicalCenterContent[2].paragraph[3]}
              <br />
              <br />

              {medicalCenterContent[2].paragraph[4]}
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col">
      <nav class="flex items-center justify-between flex-wrap  border-gray-200 bg-bgOrange p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <a
            href="https://www.du.ac.bd//"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} class="h-8" alt="DU" />
            <span class="self-center sm:text-xl md:text-2xl font-semibold whitespace-nowrap ">
              UNIVERSITY OF DHAKA
            </span>
          </a>
        </div>

        <div class=" w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
              <a
                href="#"
                className={`block mt-4 lg:inline-block lg:mt-0  mr-4 ml-4 ${
                  activeButton === "about"
                    ? "text-bgOrange"
                    : "text-gray-900 rounded hover:bg-transparent hover:text-bgOrange"
                }`}
                onClick={() => handleButtonClick("about")}
                aria-current={activeButton === "about" ? "page" : undefined}
              >
                About
              </a>
              <a
                href="#"
                className={`block mt-4 lg:inline-block lg:mt-0 ml-4  ${
                  activeButton === "people"
                    ? "text-bgOrange"
                    : "text-gray-900 rounded hover:bg-transparent hover:text-bgOrange "
                }`}
                onClick={() => handleButtonClick("people")}
              >
                People
              </a>

              <a
                href="#"
                className={`block mt-4 lg:inline-block lg:mt-0 ml-4 ${
                  activeButton === "contact"
                    ? "text-bgOrange"
                    : "text-gray-900 rounded hover:bg-transparent hover:text-bgOrange "
                }`}
                onClick={() => handleButtonClick("contact")}
              >
                Contact
              </a>
            </ul>
          </div>
          <div>
            <Link
              to="/get-started"
              type="button"
              class="inline-block ml-4 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-gray-700  hover:bg-bgOrangeDark mt-4 lg:mt-0"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>
      <div className={`center-text ${styles.heading1}`}>
        <p>Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre</p>
      </div>
      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
}

export default Home;
