import React, { useState,useEffect } from "react";

import log from "../../assets/img/signin3.svg";
import register from "../../assets/img/signup.svg";
import { useNavigate } from "react-router-dom";

import EmailRecovery from "./EmailRecovery";
import EmailRecoveryOTP from "./EmailRecoveryOTP";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";


const SlidingLoginSignup = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [userType, setUserType] = useState([]);
  const [emailRecovery, setEmailRecovery] = useState(false);
  const [emailRecoveryOTP, setEmailRecoveryOTP] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [fromSignIn,setFromSignIn]=useState(true);
  const { login ,user} = useAuth();
  const navigate = useNavigate();

  

  const handleEmailVerification =async  (isVerified) => {
    setEmailVerified(isVerified);
    console.log("Email verified:", emailVerified);
    const { confirmPassword, ...userData } = formData;
    const [showDialog, setShowDialog] = useState(false);
    //add debug to formData
   
    console.log("data", userData);
    
      try {
        const response = await axios.post('http://localhost:8000/api/users/create-user', userData);
        alert(response.data.message);
        if(response.data.message==='User created successfully') resetForm();
        alert(response.data.message);

        console.log(response.data);
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to create user: ' + (error.response && error.response.data.message ? error.response.data.message : 'Check your network connection'));
      }
      

   
   

    // You can perform any other actions based on the verification status here
  };


  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      user_type: '',
      department_id: '',
      dob: '',
      password: '',
      confirm_pass: '',
      department: '',
      session: '',
      registration_no: '',
      registered_from:'web'
    });
  };

  const openForm = () => {
    setEmailRecovery(true);
    
  };

  const closeForm = () => {
    setEmailRecovery(false);
    setEmailRecoveryOTP(false);
  };

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setFromSignIn(!fromSignIn);
  };

const handleUserTypeChange = (e) => {
    setFormData({ ...formData, user_type: e.target.value });
   //setUserType(e.target.value);
   console.log("type changed");
   console.log(e.target.value); 

  };
  const handleDepartmentChange = (e) => {
    setFormData({ ...formData, department: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };
  const handleConfirmPasswordChange = (e) => {
    setFormData({ ...formData, confirm_pass: e.target.value });
  };
  const handleDateChange = (e) => {
    setFormData({ ...formData, dob: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setFormData({ ...formData, phone: e.target.value });
  };
  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const hanndleDesignationChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, department_id: e.target.value });
  };
  const genderChange = (e) => {
    setFormData({ ...formData,gender: e.target.value });
  };
const handleEmailChange = (e) => {
  setFormData({ ...formData, email: e.target.value });
};
const handleRegistrationNoChange = (e) => {
  setFormData({ ...formData, registration_no: e.target.value });
};
const handleSessionChange = (e) => {
  setFormData({ ...formData, session: e.target.value });
};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    user_type: '',
    gender: '',
    department_id: '',
    dob: '',
    password: '',
    confirm_pass: '',
    department: '',
    session: '',
    registration_no: '',
    registered_from:'Web',
    debug:true
  
    
  });
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/doctors/get-departments');
        setDepartments(response.data.data);
        console.log('Departments:', response.data.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
       // alert('Failed to fetch departments: ' + (error.response && error.response.data.message ? error.response.data.message : 'Check your network connection'));
      }
    };
    const getRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/roles/get-roles');
        console.log(response.data);
        setUserType(response.data.roles);
        console.log('Roles:', response.data.roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
        //alert('Failed to fetch roles: ' + (error.response && error.response.data.message ? error.response.data.message : 'Check your network connection'));
      }
    };
    getRoles();

    getDepartments( );
  } , []);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    
    const loginFormData = {
      email: email,
      password: password,
    };

    console.log(loginFormData);
    try {
        fetch("http://localhost:8000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginFormData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
  
            if (data.success) {
             
              localStorage.setItem("token", data.user.token);
             
              login(data.user);


             
              
              
  
             
              if (data.user.status === "Pending") {
                alert(
                  "Your account is not approved yet. Please wait for approval."
                );
                return;
              }
              navigate('/dashboard');
  
              //  localStorage.setItem("user", JSON.stringify(data.user));
              // if (data.user.role === "admin") {
                console.log("admin");
                // window.location.href = "/dashboard/admin";
              // } else {
              //   // window.location.href = "/get-started/doctor";
              // }
  
              console.log("Login successful");
              // window.location.href = "/get-started/doctor";
            } else {
              console.log("Login failed");
              alert(data.message);
            }
          });
      } catch (error) {
        console.log(error);
      }
   

    // e.preventDefault();
    // window.location.href = "/dashboard";
    console.log("Login clicked");
  };
  
 // const fromSignIn = false;


  return (
    <div>
      
      <div
        className={`relative w-full bg-white min-h-[800px] lg:min-h-screen overflow-hidden   before:content-[''] before:absolute before:w-[1500px] before:h-[1500px] lg:before:h-[2000px] lg:before:w-[2000px] lg:before:top-[-10%]  before:top-[initial] lg:before:right-[48%] before:right-[initial]  max-lg:before:left-[30%] max-sm:bottom-[72%]   max-md:before:left-1/2  max-lg:before:bottom-[68%]  before:z-[6] before:rounded-[50%]    max-md:p-6     lg:before:-translate-y-1/2  max-lg:before:-translate-x-1/2  before:bg-backgroundColor before:transition-all before:duration-[2s] lg:before:duration-[1.8s]  ${
          isSignUpMode
            ? "lg:before:translate-x-full lg:before:-translate-y-1/2 before:-translate-x-1/2 before:translate-y-full lg:before:right-[52%] before:right-[initial]  sm:max-lg:before:bottom-[22%] max-sm:before:bottom-[20%]  max-md:before:left-1/2"
            : ""
        }`}
      >
        {emailRecovery && fromSignIn &&  <EmailRecovery closeForm={closeForm} handleEmailVerification={handleEmailVerification} fromSignIn ={fromSignIn } />

}

        <div className="absolute w-full h-full top-0 left-0">
          <div
            className={` absolute top-[95%] lg:top-1/2 left-1/2 grid grid-cols-[1fr] z-[5] -translate-x-1/2  -translate-y-full lg:-translate-y-1/2 lg:w-1/2 w-full  transition-[1s]  duration-[0.8s] lg:duration-[0.7s] ease-[ease-in-out] "  ${
              isSignUpMode
                ? "lg:left-1/4   max-lg:top-[5%]   max-lg:-translate-x-2/4   max-lg:translate-y-0"
                : "lg:left-3/4 "
            } `}
          >
            <form
            method="POST"
              action="#"
              className={` flex items-center justify-center flex-col   transition-all duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] px-20 py-0  z-20 max-md:px-6 max-md:py-0 ${
                isSignUpMode ? " opacity-0 z-10 " : " "
              }`}
            >
              <div class="flex flex-col items-center justify-center px-6 py-8  mb-4 lg:py-0">
                <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight  text-backgroundColor md:text-2xl ">
                      Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                      <div class="relative">
                        <i class=" fa fa-envelope absolute inset-y-0 left-0 pl-3 py-3 text-gray-500"></i>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                    onChange={(e) => setEmail(e.target.value)}
                          class="bg-[#d5f2ec] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-2.5"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div class="relative">
                        <i class=" fa fa-lock absolute inset-y-0 left-0 pl-3 py-3 text-gray-500"></i>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                    onChange={(e) => setPassword(e.target.value)}
                          class="bg-[#d5f2ec] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-2.5"
                          placeholder="Password"
                          required
                        />
                      </div>

                      <div class="flex items-center justify-between">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                              required=""
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 ">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <a
                          href="#"
                          onClick={openForm}
                          className="text-sm font-medium text-brightColor hover:text-hoverColor hover:underline "
                        >
                          Forgot password?
                        </a>
                      </div>
                      <button
                        type="submit"
                        class="w-full text-white bg-brightColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        onClick={handleLogin}
                     >
                        Sign in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <p className="mb-2 text-sm">
                Healthcare seeker? download the mobile app
              </p>
              <div className="flex justify-center flex-row gap-4">
                <a href="#" className="  ">
                  <div className="flex  w-40 h-12 sm:w-48 sm:h-14 bg-black text-white rounded-lg items-center justify-center">
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

                <a href="#" className="  ">
                  <div className="flex   w-40 h-12 sm:w-48 sm:h-14 bg-black text-white rounded-xl items-center justify-center">
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

            <div
              className={` flex items-center justify-center flex-col px-20 transition-all  ease-in-out duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] py-0 z-10 max-md:px-6 max-md:py-0 opacity-0 ${
                isSignUpMode ? "opacity-100 z-20 " : "  "
              }`}
            >
              {emailRecoveryOTP && <EmailRecoveryOTP closeForm={closeForm} handleEmailVerification={handleEmailVerification} fromSignIn ={fromSignIn }  />}
             
              {!emailRecoveryOTP && (
                <form action="#">
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
                        <select
                          id="user_type"
                          class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          value={formData.user_type}
                    onChange={handleUserTypeChange}
                        >
                          <option selected>Account Type</option>
                          {userType.map((role) => (
                    <option value={role.RoleName}>{role.RoleName}</option>
                  ))
                  }
                        </select>

                        {formData.user_type  !== "student" && (
                          <input
                            className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
              onChange={handleNameChange}
                          />
                        )}
                        {formData.user_type  === "student" && (
                          <div className="flex gap-2">
                            <input
                              className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                              type="text"
                              placeholder=" Your name"
                              value={formData.name}
              onChange={handleNameChange}
                            />
                            <input
                              className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                              type="text"
                              placeholder="Dept name"
                              
                              value={formData.department}
                              onChange={handleDepartmentChange}
                            />
                          </div>
                        )}

                        {(formData.user_type  === "doctor" || formData.user_type  === "student") && (
                          <div className="flex gap-2 ">
                            <input
                              className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={handleEmailChange}
                            />
                            <input
                              className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                              type="tel"
                              placeholder="Enter your phone"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                            />
                          </div>
                        )}

                        {formData.user_type  !== "doctor" && formData.user_type  !== "student" && (
                          <input
                            className="py-3 px-2 bg-[#d5f2ec] rounded-lg "
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                              onChange={handleEmailChange}
                          />
                        )}
                        {formData.user_type  !== "doctor" && formData.user_type  !== "student" && (
                          <input
                            className="py-3 px-2 bg-[#d5f2ec] rounded-lg "
                            type="tel"
                            placeholder="Enter your phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                          />
                        )}
                        {formData.user_type  === "doctor" && (
                          <select
                            id="department"
                            class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            value={formData.department_id}
                            onChange={hanndleDesignationChange}
                          >
                            <option selected>Department</option>
                            {
                      departments.map(department => (
                        <option value={department.DepartmentID}>{department.Name}</option>
                      ))
                   }
                          </select>
                        )}
                        {formData.user_type  === "student" && (
                          <div className="flex gap-2">
                            <input
                              className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                              type="number"
                              placeholder="Reg. no"
                              value={formData.registration_no}
                              onChange={handleRegistrationNoChange}
                            />
                            <input
                              className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                              type="text"
                              placeholder="Session"
                              value={formData.session}
                              onChange={handleSessionChange}
                            />
                          </div>
                        )}

                        <div className="flex gap-2">
                          <input
                            className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                            type="text"
                            onFocus={(e) => (e.currentTarget.type = "date")}
                            onBlur={(e) => (e.currentTarget.type = "text")}
                            value={formData.dob}
                            onChange={handleDateChange}
                            placeholder="DOB"
                          ></input>
                          <select
                            id="gender"
                            className="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                            value={formData.gender}
                            onChange={genderChange}
                            class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                          >
                            <option selected value="">
                              Select
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                          </select>
                        </div>

                        <div className="flex gap-2">
                          <input
                            className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                            type="password"
                            onChange={handlePasswordChange}
                  value={formData.password}
                            placeholder="Password"
                          />
                          <input
                            className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                            type="password"
                            value={formData.confirm_pass}
                  onChange={handleConfirmPasswordChange}
                            placeholder="Confirm Pass..."
                          />
                        </div>

                         {<button
                          className="mt-5 tracking-wide font-semibold bg-brightColor text-gray-100 w-full py-4 rounded-lg hover:bg-hoverColor transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                          onClick={() => setEmailRecoveryOTP(true)}
                          
                        >
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
                        </button>} 
                      </div>
                    </div>
                  </div>
                </form>
              )}
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
                Sign up and discover the digital platform of Dhaka University
                Medical Center
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
                Sign in to your account to have hastle free experience
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
