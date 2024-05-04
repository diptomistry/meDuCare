import React from 'react'

const Signup = () => {
   


        

    
  return (
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
                
              onChange={''}
                />
                 <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="email"
                  placeholder="Enter your email"
                
              onChange={''}
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="tel"
                  placeholder="Enter your phone"
                 
              onChange={''}
                />
                <div className="flex gap-2">
                <select
                    id="user_type"
                    class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                    
                    onChange={''}
                  >
                    <option selected>Account Type</option>
                    <option value="doctor">Doctor</option>
                    <option value="student">Student</option>
                    
                  
                  </select>
                  <select
                    id="gender"
                    value={''}
                    onChange={''}
                    class="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                  >
                    <option selected value=''>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
               
          
               
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type="text"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => (e.currentTarget.type = "text")}
               
                onChange={''}
                placeholder="Date of Birth"
                >
                </input>
               
               <div className="flex gap-2">
               <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="password"
                  onChange={''}
                
                  placeholder="Password"
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="password"
                 
                  onChange={''}
                  placeholder="Confirm Pass..."
                />

               </div>
               
                <button className="mt-5 tracking-wide font-semibold bg-brightColor text-gray-100 w-full py-4 rounded-lg hover:bg-hoverColor transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                onClick={''}>
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
               
              </div>
            </div>
          </div>
  )
}

export default Signup