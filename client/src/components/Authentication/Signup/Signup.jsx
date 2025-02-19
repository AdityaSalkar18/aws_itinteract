// import React from 'react'
// import {Link} from 'react-router-dom'

// const Signup = () => {
//   return (
//     <div>
//       <section class="bg-gray-50 dark:bg-gray-900">
//   <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//       <Link to ="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//           <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
//           Flowbite    
//       </Link>
//       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                   Create an account
//               </h1>
//               <form class="space-y-4 md:space-y-6" action="#">
//                   <div>
//                       <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                       <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
//                   </div>
//                   <div>
//                       <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                       <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
//                   </div>
//                   <div>
//                       <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
//                       <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
//                   </div>
//                   <div class="flex items-start">
//                       <div class="flex items-center h-5">
//                         <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
//                       </div>
//                       <div class="ml-3 text-sm">
//                         <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
//                       </div>
//                   </div>

//                   <Link to="/home">
//   <button 
//     type="button" 
//     class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//   >
//     Create an account
//   </button>
// </Link>

//                   <p class="text-sm font-light text-gray-500 dark:text-gray-400">
//                       Already have an account? <Link to="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
//                   </p>
//               </form>
//           </div>
//       </div>
//   </div>
// </section>
//     </div>
//   )
// }

// export default Signup


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import networkLogo from './network.png';

export default function Signup() {
  const [data, setData] = useState({
    userName: "",
    email: "",
    userAct: "Student",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email ends with @vcet.edu.in
    const emailRegex = /^[a-zA-Z0-9._%+-]+@vcet\.edu\.in$/;
    if (!emailRegex.test(data.email)) {
      setError("Only vcet students are allowed.");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_APP_API_URL}/users/student`;
      const { data: res } = await axios.post(url, data);
      navigate("/");
      console.log(res.message);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-[#005A9C] mb-4">
          <img src={networkLogo} alt="logo" width="55" height="55" className="inline mr-2" />
          ITInteract
        </h1>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Sign Up</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-900">User Name</label>
            <input
              type="text"
              name="userName"
              id="userName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#005A9C] focus:border-[#005A9C]"
              placeholder="Your Name"
              value={data.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#005A9C] focus:border-[#005A9C]"
              placeholder="name@vcet.edu.in"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#005A9C] focus:border-[#005A9C]"
              placeholder="••••••••"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button type="submit" className="w-full mt-6 py-2 px-4 bg-[#005A9C] text-white rounded-lg hover:bg-[#004080] focus:outline-none focus:ring-4 focus:ring-[#005A9C]">
            Sign Up
          </button>
 
          <h3 className="font-semibold text-center"><Link to="/userverification" className=" text-[#005A9C] hover:underline">Register With User Account</Link></h3>
          <div className="flex justify-between items-center mt-4">
            <Link to="/" className="text-sm text-[#005A9C] hover:underline">Already have an account? Log in here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
