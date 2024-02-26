// Home.jsx

import React, { useState, useEffect } from "react";
import Logo from "./assets/logo.png";
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
      // Set your desired width
      height: styles.homeBoxHeight, // Set your desired height
      marginLeft: "100px",
      marginRight: "100px",
      marginTop: "50px",
      border: "4px solid #1d4ed8", // Set your desired border properties
      borderRadius: "8px",
    };
    switch (activeButton) {
      case "about":
        return (
          <div
            style={boxStyle}
            className="bg-white border-gray-200 dark:bg-gray-900 p-8 rounded-lg"
          >
            <h2 className={styles.heading2}>{medicalCenterContent[1].title}</h2>
            <p className={`${styles.paragraph} mb-4`}>
              {medicalCenterContent[0].paragraph}
            </p>
            <p className={styles.paragraph}>
              {medicalCenterContent[1].paragraph}
            </p>
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
            className="bg-white border-gray-200 dark:bg-gray-900 p-8 rounded-lg"
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
    <div>
      <nav className={`bg-white border-gray-200 dark:bg-gray-900 `}>
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://www.du.ac.bd//"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} class="h-8" alt="DU" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              UNIVERSITY OF DHAKA
            </span>
          </a>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link
              to="/get-started"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </Link>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className={`block py-2 px-3 md:p-0 ${
                    activeButton === "about"
                      ? "text-blue-700"
                      : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }`}
                  onClick={() => handleButtonClick("about")}
                  aria-current={activeButton === "about" ? "page" : undefined}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block py-2 px-3 md:p-0 ${
                    activeButton === "people"
                      ? "text-blue-700 "
                      : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }`}
                  onClick={() => handleButtonClick("people")}
                >
                  People
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className={`block py-2 px-3 md:p-0 ${
                    activeButton === "contact"
                      ? "text-blue-700"
                      : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }`}
                  onClick={() => handleButtonClick("contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
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
