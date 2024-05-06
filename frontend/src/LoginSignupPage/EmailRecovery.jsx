import React, { useState } from 'react';
import Button from '../layouts/Button';
import EmailRecoveryOTP from './EmailRecoveryOTP';


const EmailRecovery = ({ closeForm ,fromSignIn, handleEmailVerification }) => {
  const [showOTP, setShowOTP] = useState(false);
  console.log("child:")
  console.log(fromSignIn)


  

  const handleSendCode = () => {
    // Logic to send code
    setShowOTP(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="popup-form absolute mt-12 text-black">
      {showOTP && <EmailRecoveryOTP handleEmailVerification={handleEmailVerification} fromSignIn ={fromSignIn } />}
      {!showOTP && (
        <form className=" w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl">
        <h1 className="text-2xl font-semibold text-center text-backgroundColor">
          Forgot your password?
        </h1>
        <p className="font-light text-gray-500">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
        <div className="flex flex-col">
          <input
            className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder="Your Email"
          />
          
        </div>
        <div className="flex gap-5 justify-between">
         <button onClick={handleSendCode} className="hover:text-hoverColor transition-all cursor-pointer">
              <Button title="Send Code" />
          </button>
          <button
            className="bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
            onClick={closeForm}
          >
            Close
          </button>
        </div>
      </form>
        )}
        
       {showOTP && (
         <div className="absolute top-2 right-2">
         <button onClick={closeForm}>
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
       )
        }
        
      </div>
    </div>
  );
};

export default EmailRecovery;
