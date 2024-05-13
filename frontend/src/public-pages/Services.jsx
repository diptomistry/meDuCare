import React from "react";
import Button from "../layouts/Button";
import { RiMicroscopeLine } from "react-icons/ri";
import ServicesCard from "../layouts/ServicesCard";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";

import { Link } from "react-scroll";

const Services = () => {
  const icon1 = <RiMicroscopeLine size={35} className="text-backgroundColor" />;
  const icon2 = <MdHealthAndSafety size={35} className="text-backgroundColor" />;
  const icon3 = <FaHeartbeat size={35} className="text-backgroundColor" />;

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16">
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Our Services
          </h1>
          <p className="mt-2 text-center lg:text-start">
            We Promote Student Wellness
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
        
          <Link
              to="doctor-schedule"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
               <Button title="See Duty Roster" />
            </Link>
          
          
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 pt-14">
        <ServicesCard
          icon={icon1}
          title="Medical Test"
          bodyText="Comprehensive medical testing services available for accurate diagnosis and assessment of health conditions. "
        />
        <ServicesCard
          icon={icon2}
          title="Doctors Treatment"
          bodyText="Experience our top-notch medical services provided by highly skilled and compassionate doctors."
        />
        <ServicesCard
          icon={icon3}
          title="Medicine"
          bodyText="Get access to a wide range of high-quality medicines and prompt pharmaceutical services."
        />
      </div>
    </div>
  );
};

export default Services;