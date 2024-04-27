import React from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
          

const Footer = () => {
  return (
    <div className=" bg-backgroundColor text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-xl pb-4">Du HealthCare</h1>
          <p className=" text-sm">
            Our team of dedicated doctors, each specializing in unique fields
            such as orthopedics, cardiology, pediatrics, neurology, dermatology,
            and more.
          </p>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">About Us</h1>
          <nav className=" flex flex-col gap-2">
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              About
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Services
            </Link>
            <Link
              to="doctors"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Doctors
            </Link>
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Services</h1>
          <nav className=" flex flex-col gap-2">
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Medical Test
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Doctors Treatment
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Medicine
            </Link>
          </nav>
        </div>
        <div className=" w-full md:w-1/4">
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <Link to="/" spy={true} smooth={true} duration={500}>
            Dhaka 1000 ,Bangladesh<br />
              Near the Science Annex Building
            </Link>
            <Link to="/" spy={true} smooth={true} duration={500}>
              cmo.dumc@gmail.com
            </Link>
            <Link to="/" spy={true} smooth={true} duration={500}>
           +88 09666 911 463 (Ext. )
            </Link>
          </nav>
        </div>
      </div>
    <div className="grid grid-cols-3 justify-items-center ">
      <div className="py-4 underline">
        
<RouterLink
  to="/create-account"
  class=" hover:text-brightColor  "

>
Create Account
</RouterLink>
      </div>
      <div>
      <div>
        <p className=" py-4 hidden md:block">
          @copyright developed by
          <span className="text-hoverColor"> DRM</span> | All
          rights reserved
        </p>
      </div>
      </div>
      <div className="py-4">
      <RouterLink
              to="/get-started"
              type="button"
              class="inline-block  text-sm px-6 py-2 leading-none border rounded text-white border-white   hover:bg-brightColor  "
            >
              Login
            </RouterLink>
      </div>

    </div>
    <div className="md:hidden">
    <p className=" py-4 text-center">
          @copyright developed by
          <span className="text-hoverColor"> DRM</span> | All
          rights reserved
        </p>

    </div>
    </div>
  );
};

export default Footer;