/*
 <div
                 className={` flex items-center justify-center flex-col px-20 transition-all  ease-in-out delay-700 overflow-hidden  z-10 opacity-0 ${
                    isSignUpMode ? "opacity-100 z-20 " : "  "
                  }`}
                >
                    <Signup></Signup>

                </div>
 */
                import React, { useState } from "react";

                import log from "../assets/img/signin3.svg";
                import register from "../assets/img/signup.svg";
                import Signup from "./Signup";
                
                
                
                const SlidingLoginSignup = () => {
                  const [isSignUpMode, setIsSignUpMode] = useState(false);
                
                  const toggleSignUpMode = () => {
                    setIsSignUpMode(!isSignUpMode);
                  };
                
                  return (
                    <div>
                      <div
                        className={`relative w-full bg-white min-h-[800px] lg:min-h-screen overflow-hidden   before:content-[''] before:absolute before:w-[1500px] before:h-[1500px] lg:before:h-[2000px] lg:before:w-[2000px] lg:before:top-[-10%] before:top-[initial] lg:before:right-[48%] before:right-[initial]  max-lg:before:left-[30%] max-sm:bottom-[72%]   max-md:before:left-1/2  max-lg:before:bottom-[68%] before:z-[6] before:rounded-[50%]    max-md:p-6     lg:before:-translate-y-1/2  max-lg:before:-translate-x-1/2  before:bg-backgroundColor before:transition-all before:duration-[2s] lg:before:duration-[1.8s]  ${
                          isSignUpMode
                            ? "lg:before:translate-x-full lg:before:-translate-y-1/2 before:-translate-x-1/2 before:translate-y-full lg:before:right-[52%] before:right-[initial]  sm:max-lg:before:bottom-[32%] max-sm:before:bottom-[28%]  max-md:before:left-1/2"
                            : ""
                        }`}
                      >
                        <div className="absolute w-full h-full top-0 left-0">
                          <div
                            className={` absolute top-[95%] lg:top-1/2 left-1/2 grid grid-cols-[1fr] z-[5] -translate-x-1/2  -translate-y-full lg:-translate-y-1/2 lg:w-1/2 w-full  transition-[1s]  duration-[0.8s] lg:duration-[0.7s] ease-[ease-in-out] "  ${
                              isSignUpMode
                                ? "lg:left-1/4   max-lg:top-[5%]   max-lg:-translate-x-2/4   max-lg:translate-y-0"
                                : "lg:left-3/4 "
                            } `}
                          >
                            <div class="inline-grid items-center justify-items-center">
                              <div class=" col-span-full row-span-full">
                                <form
                                  action="#"
                                  className={` flex items-center justify-center flex-col   transition-all duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] px-20 py-0  z-20 max-md:px-6 max-md:py-0 ${
                                    isSignUpMode ? " opacity-0 z-10 " : " "
                                  }`}
                                >
                                  <h2 className="text-2xl text-gray-700 mb-4">Sign in</h2>
                                  <div className="flex items-center w-full max-w-xs bg-gray-200 mb-4 h-14 rounded-full px-4">
                                    <i className="fas fa-user text-gray-500 mr-2 text-lg"></i>
                                    <input
                                      type="text"
                                      placeholder="Username"
                                      className="w-full bg-transparent outline-none border-none text-gray-700 font-semibold text-lg placeholder-gray-400"
                                    />
                                  </div>
                                  <div className="flex items-center w-full max-w-xs bg-gray-200 mb-4 h-14 rounded-full px-4">
                                    <i className="fas fa-lock text-gray-500 mr-2 text-lg"></i>
                                    <input
                                      type="password"
                                      placeholder="Password"
                                      className="w-full bg-transparent outline-none border-none text-gray-700 font-semibold text-lg placeholder-gray-400"
                                    />
                                  </div>
                                  <input
                                    type="submit"
                                    value="Login"
                                    className="bg-blue-500 text-white font-semibold uppercase py-3 px-6 rounded-full mb-4 cursor-pointer transition-colors duration-500 hover:bg-blue-600 w-40"
                                  />
                                  <p className="mb-2 text-sm">
                                    If you are a healthcare seeker, please download the mobile app
                                  </p>
                                  <div className="flex justify-center gap-4">
                                    <a
                                      href="#"
                                      className=""
                                    >
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
                                    </a>
                                    <a
                                      href="#"
                                      className=""
                                    >
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
                                    </a>
                                   
                                  </div>
                                </form>
                              </div>
                              <div class=" col-span-full row-span-full">
                                <form
                                  action="#"
                                  className={` flex items-center justify-center flex-col px-20 transition-all  ease-in-out delay-700 overflow-hidden  z-10 opacity-0 ${
                                    isSignUpMode ? "opacity-100 z-20 " : "  "
                                  }`}
                                >
                                  <h2 className="text-2xl text-gray-700 mb-4">Sign up</h2>
                
                                  <div className="flex items-center w-full max-w-xs bg-gray-200 mb-4 h-14 rounded-full px-4">
                                    <i className="fas fa-user text-gray-500 mr-2 text-lg"></i>
                                    <input
                                      type="text"
                                      placeholder="Username"
                                      className="w-full bg-transparent outline-none border-none text-gray-700 font-semibold text-lg placeholder-gray-400"
                                    />
                                  </div>
                                  <div className="flex items-center w-full max-w-xs bg-gray-200 mb-4 h-14 rounded-full px-4">
                                    <i className="fas fa-envelope text-gray-500 mr-2 text-lg"></i>
                                    <input
                                      type="email"
                                      placeholder="Email"
                                      className="w-full bg-transparent outline-none border-none text-gray-700 font-semibold text-lg placeholder-gray-400"
                                    />
                                  </div>
                                  <div className="flex items-center w-full max-w-xs bg-gray-200 mb-4 h-14 rounded-full px-4">
                                    <i className="fas fa-lock text-gray-500 mr-2 text-lg"></i>
                                    <input
                                      type="password"
                                      placeholder="Password"
                                      className="w-full bg-transparent outline-none border-none text-gray-700 font-semibold text-lg placeholder-gray-400"
                                    />
                                  </div>
                                  <input
                                    type="submit"
                                    className="bg-blue-500 text-white font-semibold uppercase py-3 px-6 rounded-full mb-4 cursor-pointer transition-colors duration-500 hover:bg-blue-600 w-40"
                                    value="Sign up"
                                  />
                                  <p className="mb-2 text-sm">
                                    If you are a healthcare seeker, please download the mobile app
                                  </p>
                                  <div className="flex justify-center gap-4">
                                    <a
                                      href="#"
                                      className=""
                                    >
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
                                    </a>
                                    <a
                                      href="#"
                                      className=""
                                    >
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
                                    </a>
                                   
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                
                        <div className="absolute h-full w-full top-0 left-0 grid grid-cols-[1fr]   max-lg:grid-rows-[1fr_2fr_1fr]  lg:grid-cols-[repeat(2,1fr)]">
                          <div
                            className={`flex flex-row justify-around lg:flex-col items-center  max-lg:col-[1_/_2]  max-lg:px-[8%]   max-lg:py-10 lg:items-end  text-center z-[6]   max-lg:row-[1_/_2]      pl-[12%] pr-[17%] pt-12 pb-8 ${
                              isSignUpMode ? "pointer-events-none" : " pointer-events-auto"
                            }`}
                          >
                            <div
                              className={`text-white transition-transform duration-[0.9s]  lg:duration-[1.1s] ease-[ease-in-out]  delay-[0.8s] lg:delay-[0.4s]   max-lg:pr-[15%]  max-md:px-4  max-md:py-2 ${
                                isSignUpMode
                                  ? "lg:translate-x-[-800px]   max-lg:translate-y-[-300px]"
                                  : ""
                              }`}
                            >
                              <h3 className="font-semibold leading-none text-[1.2rem] lg:text-[1.5rem] text-gray-700">
                                New here ?
                              </h3>
                              <p class="  text-[0.7rem] lg:text-[0.95rem] px-0 py-2 lg:py-[0.7rem]">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Debitis, ex ratione. Aliquid!
                              </p>
                              <button
                                className="bg-transparent w-[110px] h-[35px] text-gray-700 text-[0.7rem] lg:w-[130px] lg:h-[41px] lg:text-[0.8rem]  font-semibold   border-2 border-white rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-700"
                                id="sign-up-btn"
                                onClick={toggleSignUpMode}
                              >
                                Sign up
                              </button>
                            </div>
                            <img
                              src={log}
                              className={`  max-md:hidden w-[200px] lg:w-full transition-transform duration-[0.9s] lg:duration-[1.1s] ease-[ease-in-out] delay-[0.6s] lg:delay-[0.4s] ${
                                isSignUpMode
                                  ? "lg:translate-x-[-800px]   max-lg:translate-y-[-300px]"
                                  : ""
                              }`}
                              alt=""
                            />
                          </div>
                          <div
                            className={`flex flex-row   max-lg:row-[3_/_4] lg:flex-col items-center lg:items-end justify-around text-center z-[6]   max-lg:col-[1_/_2]   max-lg:px-[8%]   max-lg:py-10 pointer-events-none pl-[17%] pr-[12%] pt-12 pb-8 ${
                              isSignUpMode ? " pointer-events-auto" : ""
                            }`}
                          >
                            <div
                              className={`text-white transition-transform duration-[0.9s] lg:duration-[1.1s] ease-in-out delay-[0.8s] lg:delay-[0.4s]   max-lg:pr-[15%] max-md:px-4  max-md:py-2 ${
                                isSignUpMode
                                  ? ""
                                  : "lg:translate-x-[800px]   max-lg:translate-y-[300px]"
                              }`}
                            >
                              <h3 className="font-semibold leading-none text-[1.2rem] lg:text-[1.5rem] text-gray-700">
                                One of us ?
                              </h3>
                              <p class=" py-2 text-[0.7rem] lg:text-[0.95rem] px-0 py-2 lg:py-[0.7rem]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                              </p>
                              <button
                                className=" text-gray-700 bg-transparent w-[110px] h-[35px]  text-[0.7rem] lg:w-[130px] lg:h-[41px] lg:text-[0.8rem]  font-semibold   border-2 border-white rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-700"
                                id="sign-in-btn"
                                onClick={toggleSignUpMode}
                              >
                                Sign in
                              </button>
                            </div>
                            <img
                              src={register}
                              className={` max-md:hidden w-[200px] lg:w-full transition-transform duration-[0.9s] lg:duration-[1.1s] ease-[ease-in-out] delay-[0.6s] lg:delay-[0.4s] ${
                                isSignUpMode
                                  ? " translate-x-0"
                                  : "lg:translate-x-[800px]  max-lg:translate-y-[300px]"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                };
                export default SlidingLoginSignup;
                