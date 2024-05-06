import React from 'react'

const ChangePassword = () => {
  return (
    <div class="flex flex-col ">
      
      <div class="w-full p-10 bg-white rounded-lg shadow md:mt-0 sm:max-w-md ">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Change Password
          </h2>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              
              <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>


              <input
            className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-full"
            type="password" name="password" id="password" placeholder="••••••••"
            required=""
          />
              </div>
              <div>
                  <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                  <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-full" required=""/>
              </div>
              
              <button type="submit" class="w-full text-white bg-brightColor hover:bg-hoverColor focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Reset passwod</button>
          </form>
      </div>
  </div>
  )
}

export default ChangePassword