import React, { useState } from "react";
import signupImage from "../assets/img/signUp.png";
const RegistartionForm = () => {
  const [userType, setUserType] = useState("");

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 text-center bg-brightColor/90 hidden md:flex">
          <div
            className="m-2 xl:m-6 w-full  bg-contain bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(${signupImage})`,
            }}
          ></div>
        </div>
        <div className="lg:w-2/3 xl:w-7/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-backgroundColor">
                Authority Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="text"
                  placeholder="Enter your name"
                />
                 <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="email"
                  placeholder="Enter your email"
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="tel"
                  placeholder="Enter your phone"
                />
                <div className="flex gap-2">
                <select
                    id="type"
                    class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                    value={userType}
                    onChange={handleUserTypeChange}
                  >
                    <option selected>Type</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="others">Others</option>
                  </select>
                  <select
                    id="gender"
                    class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                  >
                    <option selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                {userType === "doctor" && (
                 
             
                  <select
                    id="designation"
                    class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected>Designation</option>
                    <option value="male">a</option>
                    <option value="female">b</option>
                    <option value="others">c</option>
                  </select>
                )}
          
               
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type="text"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => (e.currentTarget.type = "text")}
                placeholder="Date of Birth"
                >
                </input>
               
               <div className="flex gap-2">
               <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="password"
                  placeholder="Password"
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="password"
                  placeholder="Confirm Pass..."
                />

               </div>
               
                <button className="mt-5 tracking-wide font-semibold bg-brightColor text-gray-100 w-full py-4 rounded-lg hover:bg-hoverColor transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="/get-started">
                    <span className="text-brightColor font-semibold">
                      Sign in
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistartionForm;
