import React, { useState } from "react";
import Logo from "./assets/img/dumc.png";
import login from "./assets/img/signin.png";
import mobileApp from "./assets/mobileApp.png";
import styles from "./style";
import Popup from "./getStarted/clickHere";
import Button from "./layouts/Button";

// const GetStartedPage = () => {
//   const [isPopupOpen, setPopupOpen] = useState(false);

//   const openPopup = () => {
//     setPopupOpen(true);
//   };

//   const closePopup = () => {
//     setPopupOpen(false);
//   };

//   const handleLogin = (e) => {
//     // e.preventDefault();
//     window.location.href = "/dashboard";
//     console.log("Login clicked");
//   };
//   return (
//     <div className="flex flex-col max-h-screen ">
//       <div className="flex-1 bg-backgroundColor bg-opacity-50 ">
//         <div className="flex flex-col items-center justify-center px-1 py-2 mx-auto ">
//           <a
//             href="#"
//             className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
//           >
//             <div className="flex flex-col">
//             <div className="flex justify-center"><img className="w-20 h-20 mr-2" src={Logo} alt="logo" /></div>
//               <div className=" text-2xl font-semibold"> Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre</div>

//             </div>
            
//           </a>
//           <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  border-gray-700">
//             <div className="p-4 space-y-2 md:space-y-4 sm:p-6">
//               <h1 className="text-xl font-semibold text-center text-backgroundColor    md:text-2xl ">
//                 Sign in to your account
//               </h1>
//               <form className="w-80 md:w-96 space-y-4 bg-white p-5 rounded-xl md:space-y-6" action="#">
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 "
//                   >
//                     Your email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className=" bg-[#d5f2ec] rounded-lg  border border-gray-300 text-gray-900 sm:text-sm   block w-full p-2.5  "
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-sm font-medium text-gray-900 "
//                   >
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     placeholder="••••••••"
//                     className="bg-[#d5f2ec] border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-start">
//                     <div className="flex items-center h-5">
//                       <input
//                         id="remember"
//                         aria-describedby="remember"
//                         type="checkbox"
//                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  "
//                         required
//                       />
//                     </div>
//                     <div className="ml-3 text-sm">
//                       <label htmlFor="remember" className="text-gray-500 ">
//                         Remember me
//                       </label>
//                     </div>
//                   </div>
//                   <a
//                     href="#"
//                     className="text-sm font-medium text-brightColor hover:underline "
//                   >
//                     Forgot password?
//                   </a>
//                 </div>
//                 <a
//                   href="/get-started/doctor"
//                   className="block w-full text-center text-white bg-brightColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-primary-700   font-medium rounded-lg text-sm px-5 py-2.5  "
//                 >
//                   Sign in
//                 </a>
               
           

//                 <p
//                   onSubmit={handleLogin}
//                   onClick={handleLogin}
//                   className="text-sm font-light text-gray-500 "
//                 >
//                   Don’t have an account yet?{" "}
//                   <a
//                     href="/create-account"
//                     className="font-medium text-brightColor hover:underline "
//                     //onClick={openPopup} // Add onClick event to open the popup
//                   >
//                     Sign up
//                   </a>
//                 </p>

//                 {/* Render the Popup component when isPopupOpen is true */}
//                 {isPopupOpen && (
//                   <Popup onClose={closePopup}>
//                     {/* Add your pop-up content here */}
//                     <div>
//                       <p className="text-base">
//                         You can create an account if and only if you are
//                         connected with
//                       </p>
//                       <p className="text-red-500 font-bold">
//                         Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre
//                       </p>
//                       <br />
//                       <p className="text-base">
//                         Please contact with{" "}
//                         <span className="text-red-500 font-bold">
//                           Dr. Mohammad Tanvir Ali
//                         </span>{" "}
//                         to create an account
//                       </p>
//                     </div>
//                   </Popup>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//     <div className="bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
//     <div
//         className={`box-shadow text-center sidebar ${styles.heading1}`}
//         style={{
//           //marginBottom: "",
//         }}
//       >
//         If you are a healthcare seeker, please download our mobile app
//       </div>
//       <div className={`animate-bounce text-center text-4xl text-brightColor`}>
//         Download Now
//       </div>

//       <div
//         style={{
//           marginBottom: "5%",
//           marginLeft: "0%",
//         }}
//       >
//         <div className="flex flex-col md:flex-row items-center justify-center gap-4">
//           <div className=" ">
//             <div className="flex  w-48 h-14 bg-black text-white rounded-lg items-center justify-center">
//               <div className="mr-3">
//                 <svg viewBox="30 336.7 120.9 129.2" width="30">
//                   <path
//                     fill="#FFD400"
//                     d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
//                   />
//                   <path
//                     fill="#FF3333"
//                     d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
//                   />
//                   <path
//                     fill="#48FF48"
//                     d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
//                   />
//                   <path
//                     fill="#3BCCFF"
//                     d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-xs">GET IT ON</div>
//                 <div className="text-xl font-semibold font-sans -mt-1">
//                   Google Play
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="">
//             <div className="flex  w-48 h-14 bg-black text-white rounded-xl items-center justify-center">
//               <div className="mr-3">
//                 <svg viewBox="0 0 384 512" width="30">
//                   <path
//                     fill="currentColor"
//                     d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-xs">Download on the</div>
//                 <div className="text-2xl font-semibold font-sans -mt-1">
//                   App Store
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };



// export default GetStartedPage;
const GetStartedPage = () => {
    const handleLogin = (e) => {
    // e.preventDefault();
    window.location.href = "/dashboard";
    console.log("Login clicked");
  };
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
    <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
      <div className="flex-1 bg-brightColor text-center hidden md:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${login})`,
          }}
        ></div>
      </div>
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  shadow-lg">
            <div className="p-4 space-y-2 md:space-y-4 sm:p-6">
              <h1 className="text-xl font-semibold text-center text-backgroundColor    md:text-2xl ">
                Sign in to your account
              </h1>
              <form className="w-80 md:w-96 space-y-4 bg-white p-5 rounded-xl md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" bg-[#d5f2ec] rounded-lg  border border-gray-300 text-gray-900 sm:text-sm   block w-full p-2.5  "
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-[#d5f2ec] border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  "
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-brightColor hover:underline "
                  >
                    Forgot password?
                  </a>
                </div>
                <a
                  href="/get-started/doctor"
                  className="block w-full text-center text-white bg-brightColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-primary-700   font-medium rounded-lg text-sm px-5 py-2.5  "
                >
                  Sign in
                </a>
               
           

                <p
                  onSubmit={handleLogin}
                  onClick={handleLogin}
                  className="text-sm font-light text-gray-500 "
                >
                  Don’t have an account yet?{" "}
                  <a
                    href="/create-account"
                    className="font-medium text-brightColor hover:underline "
                    //onClick={openPopup} // Add onClick event to open the popup
                  >
                    Sign up
                  </a>
                </p>

                
              </form>
            </div>
          </div>
      </div>
    </div>
  </div>
  );

};
export default GetStartedPage;

