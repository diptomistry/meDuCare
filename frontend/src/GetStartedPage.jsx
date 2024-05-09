import React, { useState } from "react";
import Logo from "./assets/img/dumc.png";
import login from "./assets/img/signin.png";
import mobileApp from "./assets/mobileApp.png";
import styles from "./style";
import Popup from "./getStarted/clickHere";
import Button from "./layouts/Button";
import { useAuth } from "./auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const GetStartedPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login ,user} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

    const handleLogin = async () => {
      const formData = {
       email:email,
       password: password,
      };

    console.log(formData);
    try {
      fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
        
          if (data.success) {
            login(data.user);
            //save token to local storage

            localStorage.setItem("token", data.user.token);
            localStorage.setItem("role", data.user.role);
            if (data.user.status === "Pending") {
              alert(
                "Your account is not approved yet. Please wait for approval."
              );
              return;
            }

          //  localStorage.setItem("user", JSON.stringify(data.user));
          if(data.user.role === "admin"){
            window.location.href = "/dashboard/admin";
          }else{
            // window.location.href = "/dashboard/admin";
          }

            console.log("Login successful");
         // window.location.href = "/dashboard/admin";
          } else {
            console.log("Login failed");
            alert(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }

      
    
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
          <div className="w-full bg-white rounded-lg  border md:mt-0 sm:max-w-md xl:p-0  shadow-lg">
            <div className="p-4 space-y-2 md:space-y-4 sm:p-6">
              <h1 className="text-xl font-semibold text-center text-backgroundColor    md:text-2xl ">
                Sign in to your account
              </h1>
              <form
                className="w-80 md:w-96 space-y-4 bg-white p-5 rounded-xl md:space-y-6"
                action="#"
              >
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <button
                onClick={handleLogin}
                  // href="/dashboard/admin"
                  className="block w-full text-center text-white bg-brightColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-primary-700   font-medium rounded-lg text-sm px-5 py-2.5  "
                >
                  Sign in
                </button>

                <p
                  // onClick={handleLogin}
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
