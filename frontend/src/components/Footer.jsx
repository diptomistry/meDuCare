import React from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
          

const Footer = () => {
  return (
    <div className=" bg-backgroundColor text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" flex-col w-full md:w-1/4">
          <div className="">
          <h1 className="animate-bounce  font-semibold text-xl text-center pb-4">Download Now</h1>
          </div>
         
          <div
        style={{
          marginTop: "5%",
          marginBottom: "5%",
          marginLeft: "0%",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className=" ">
            <div className="flex  w-48 h-14 bg-black text-white rounded-lg items-center justify-center">
              <div className="mr-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                  <path
                    fill="#FFD400"
                    d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                  />
                  <path
                    fill="#FF3333"
                    d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                  />
                  <path
                    fill="#48FF48"
                    d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                  />
                  <path
                    fill="#3BCCFF"
                    d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs">GET IT ON</div>
                <div className="text-xl font-semibold font-sans -mt-1">
                  Google Play
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex  w-48 h-14 bg-black text-white rounded-xl items-center justify-center">
              <div className="mr-3">
                <svg viewBox="0 0 384 512" width="30">
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs">Download on the</div>
                <div className="text-2xl font-semibold font-sans -mt-1">
                  App Store
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
<p class="max-w-lg text-3xl font-semibold leading-loose text-gray-900 text-center">DU HealthCare App</p>

          
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
            <a className="underline cursor-pointer">
            Citizen Charter
            </a>
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
