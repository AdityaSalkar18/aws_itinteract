// import React from 'react'
// import {Link} from 'react-router-dom'


// const Login = () => {
//   return (
//     <div>
//       <section class="bg-gray-50 dark:bg-gray-900">
//   <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//       <Link to="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//           <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
//           Flowbite    
//       </Link>
//       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                   Sign in to your account
//               </h1>
//               <form class="space-y-4 md:space-y-6" action="#">
//                   <div>
//                       <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                       <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
//                   </div>
//                   <div>
//                       <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                       <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
//                   </div>
//                   <div class="flex items-center justify-between">
//                       <div class="flex items-start">
//                           <div class="flex items-center h-5">
//                             <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
//                           </div>
//                           <div class="ml-3 text-sm">
//                             <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
//                           </div>
//                       </div>
//                       <Link to="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
//                   </div>
//                   <Link to="/home">
//   <button 
//     type="button" 
//     class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//   >
//     Sign in
//   </button>
// </Link>

//                   <p class="text-sm font-light text-gray-500 dark:text-gray-400">
//                       Don’t have an account yet? <Link to="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
//                   </p>
//               </form>
//           </div>
//       </div>
//   </div>
// </section>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import networkLogo from './network.png';
import { PiStudentBold } from "react-icons/pi";
import { PiUserBold } from "react-icons/pi";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location.href = "/home";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-[#005A9C] mb-4">
          <img src={networkLogo} alt="" width="55" height="55" className="inline mr-2" />
          ITInteract
        </h1>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Login</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#005A9C] focus:border-[#005A9C]"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#005A9C] focus:border-[#005A9C]"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-between items-center mt-4">
            <Link to="/signup" className="text-sm text-[#005A9C] hover:underline">Forget Password?</Link>
            <Link href="#" data-modal-target="static-modal" data-modal-toggle="static-modal" class= "text-sm text-[#005A9C] hover:underline">
   Register With New Account
</Link>

          </div>

          <button type="submit" className="w-full mt-6 py-2 px-4 bg-[#005A9C] text-white rounded-lg hover:bg-[#004080] focus:outline-none focus:ring-4 focus:ring-[#005A9C]">
            Log in
          </button>
        </form>
      </div>


















      <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">

          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

            <div class="flex items-center justify-between p-4  border-gray-200">

              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-4 md:p-5 space-y-4">
             
                <div class="grid md:grid-cols-2 gap-8 mb-6">
 


                 <Link to="/signup">
                  <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                    
                      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"><PiStudentBold />Register With Student Account</h5>
                    
                    <p class="mb-3  font-normal text-gray-500 dark:text-gray-400">VCET students, register with your student account using your VCET email ID to get started! 
                    
                    
                    </p>
                    
                  </div>
                 </Link>

    
                 <Link to="/userverification">
                  <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                    
                      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"><PiUserBold />Register With User Account</h5>
             
                    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">VCET alumni or users, register with your account using your personal email ID to join us!</p>
                    
                  </div>
                  </Link>

                </div>
             
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}


