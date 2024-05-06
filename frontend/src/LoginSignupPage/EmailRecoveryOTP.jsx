import React, { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";

const EmailRecoveryOTP = ({handleEmailVerification,fromSignIn,closeForm }) => {
    // console.log(fromSignIn);
    // console.log(handleEmailVerification);
   

    const handleEmailVerified = () => {
        //if fromsignin is true then set showchange password to true
       if(fromSignIn){
              setShowChangePassword(true);
  
         }
        
        
        // Simulate email verification process
        const emailVerified = true;
        handleEmailVerification(emailVerified); // Send the boolean information back to the parent
      };
  useEffect(() => {
    const handleKeyDown = (e) => {
      const form = document.getElementById("otp-form");
      const inputs = [...form.querySelectorAll("input[type=text]")];
      const submit = form.querySelector("button[type=submit]");

      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "Tab" &&
        !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        const index = inputs.indexOf(e.target);
        if (index > 0) {
          inputs[index - 1].value = "";
          inputs[index - 1].focus();
        }
      }
    };

    const handleInput = (e) => {
      const form = document.getElementById("otp-form");
      const inputs = [...form.querySelectorAll("input[type=text]")];
      const submit = form.querySelector("button[type=submit]");
      const { target } = e;
      const index = inputs.indexOf(target);
      if (target.value) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          submit.focus();
        }
      }
    };

    const handleFocus = (e) => {
      e.target.select();
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const form = document.getElementById("otp-form");
      const inputs = [...form.querySelectorAll("input[type=text]")];
      const submit = form.querySelector("button[type=submit]");
      const text = e.clipboardData.getData("text");
      if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
        return;
      }
      const digits = text.split("");
      inputs.forEach((input, index) => (input.value = digits[index]));
      submit.focus();
    };

    const form = document.getElementById("otp-form");
    const inputs = [...form.querySelectorAll("input[type=text]")];

    inputs.forEach((input) => {
      input.addEventListener("input", handleInput);
      input.addEventListener("keydown", handleKeyDown);
      input.addEventListener("focus", handleFocus);
      input.addEventListener("paste", handlePaste);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("input", handleInput);
        input.removeEventListener("keydown", handleKeyDown);
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("paste", handlePaste);
      });
    };
  }, []);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [timer, setTimer] = useState(10); // 1 minute in seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(true);
    }

    return () => clearInterval(interval);
  }, [timer]);
  const handleResendCode = () => {
    // Code to resend the verification code
    setTimer(10); // Reset the timer to 1 minute
    setIsButtonDisabled(false);
  };

  return (
    <div>
      {showChangePassword  && <ChangePassword />}
      {!showChangePassword && (
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow mt-2">
            {!fromSignIn && (
                <div className="flex justify-end">
                <button
                      
                      onClick={closeForm}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-brightColor hover:text-hoverColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    </div>
                    )}
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
            <p className="text-[15px] text-slate-500">
              Enter the 4-digit verification code that was sent to your email.
            </p>
          </header>
          
          <form id="otp-form">
            <div className="max-w-[260px] mx-auto mt-4">
              <a className="w-full mb-4 inline-flex justify-center whitespace-nowrap rounded-lg bg-blue-100 px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm shadow-indigo-950/10 ">
                {isButtonDisabled ? "Code is not valid now  " : `${timer}`}
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <input
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                pattern="\d*"
                maxLength="1"
              />
              <input
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength="1"
              />
              <input
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength="1"
              />
              <input
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength="1"
              />
            </div>
            <div className="max-w-[260px] mx-auto mt-4">
              {!isButtonDisabled ? (
                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                  onClick={handleEmailVerified}
                >
                  Verify Email
                </button>
              ) : (
                <a className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-gray-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 ">
                  Verify Email
                </a>
              )}
            </div>
          </form>
          <div className="text-sm text-slate-500 mt-4">
            {isButtonDisabled ? (
              <span>
                Time's up!&nbsp;
                <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#"
                  onClick={handleResendCode}
                >
                  Resend code
                </a>
              </span>
            ) : (
              <div className="text-sm text-slate-500 mt-4">
                Didn't receive code?{" "}
                <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                  onClick={handleResendCode}
                >
                  Resend
                </a>
              </div>
            )}
            
          </div>
          
        </div>
        
      )}
      
    </div>
  );
};

export default EmailRecoveryOTP;
