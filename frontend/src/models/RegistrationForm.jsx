import React, { useState,useEffect } from "react";
import signupImage from "../assets/img/signUp.png";
import axios from "axios";

const RegistartionForm = () => {
  const [userType, setUserType] = useState([]);
  const [departments, setDepartments] = useState([]);

  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, user_type: e.target.value });
  };
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/get-departments');
        setDepartments(response.data.data);
        console.log('Departments:', response.data.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        alert('Failed to fetch departments: ' + (error.response && error.response.data.message ? error.response.data.message : 'Check your network connection'));
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
        alert('Failed to fetch roles: ' + (error.response && error.response.data.message ? error.response.data.message : 'Check your network connection'));
      }
    };
    getRoles();

    getDepartments( );
  } , []);

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
    
  });
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
const handleEmalChange = (e) => {
  setFormData({ ...formData, email: e.target.value });
};
const handleRegistrationNoChange = (e) => {
  setFormData({ ...formData, registration_no: e.target.value });
};
const handleSessionChange = (e) => {
  setFormData({ ...formData, session: e.target.value });
};
const handleDepartmentChange = (e) => {
  setFormData({ ...formData, department: e.target.value });
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirm_pass) {
      alert('Passwords do not match!');
      return;
    }

   

    const { confirmPassword, ...userData } = formData; // Exclude confirmPassword from data sent to server

    try {
      const response = await axios.post('http://localhost:8000/api/users/create-user', userData);
      alert(response.data.message);
      if(response.data.message==='User created successfully') resetForm();
      console.log(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user: ' + (error.response && error.response.data.message ? error.response.data.message : 'Check your network connection'));
    }
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
                  value={formData.name}
              onChange={handleNameChange}
                />
                 <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
              onChange={handleEmalChange}
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="tel"
                  placeholder="Enter your phone"
                  value={formData.phone}
              onChange={handlePhoneChange}
                />
                <div className="flex gap-2">
                <select
                    id="user_type"
                    class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                    value={formData.user_type}
                    onChange={handleUserTypeChange}
                  >
                    <option selected>Account Type</option>
                  {userType.map((role) => (
                    <option value={role.RoleName}>{role.RoleName}</option>
                  ))
                  }
                  </select>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={genderChange}
                    class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                  >
                    <option selected value=''>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                {formData.user_type === "doctor" && (
                 
             
                  <select
                    id="designation"
                    value={formData.department_id}
                    onChange={hanndleDesignationChange}
                    class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    {/* <option selected></option> */}
                   {
                      departments.map(department => (
                        <option value={department.DepartmentID}>{department.Name}</option>
                      ))
                   }
                  </select>
                )}
                 {formData.user_type === "student" && (
                 
                 <input
                 className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                 type="registration_no"
                 placeholder="Enter your registration number"
                 value={formData.registration_no}
             onChange={handleRegistrationNoChange}
               />
               
                 
               )}
                {formData.user_type === "student" && (
                 
                 <input
                 className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                 type="session"
                 placeholder="Enter your session"
                 value={formData.session}
             onChange={handleSessionChange}
               />
               
                 
               )}
                {formData.user_type === "student" && (
                 
                 <input
                 className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                 type="department"
                 placeholder="Enter your department name"
                 value={formData.department}
             onChange={handleDepartmentChange}
               />
               
                 
               )}
          
               
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type="text"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => (e.currentTarget.type = "text")}
                value={formData.dob}
                onChange={handleDateChange}
                placeholder="Date of Birth"
                >
                </input>
               
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
               
                <button className="mt-5 tracking-wide font-semibold bg-brightColor text-gray-100 w-full py-4 rounded-lg hover:bg-hoverColor transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                onClick={handleSubmit}>
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
                  <a href="/login">
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
