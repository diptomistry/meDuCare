import React from "react";
import Button from "../layouts/Button";
import { Link } from "react-scroll";
const Contact = ({ closeForm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="popup-form absolute mt-12 text-black">
        <form className=" w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl">
          <h1 className="text-4xl font-semibold text-center text-backgroundColor">
            Book Now
          </h1>
          <div className="py-3 px-2 bg-[#d5f2ec] rounded-lg text-center">
          
               To book appointment you must download our mobile app
          </div>
         
         
         
          <div className=" flex gap-5 justify-between">
           
            <Link
              to="footer"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
              onClick={closeForm}
            >
             <Button title="Download" />
            </Link>
            <button
              className=" bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
              onClick={closeForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
