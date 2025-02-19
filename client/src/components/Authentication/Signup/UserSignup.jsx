        
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import networkLogo from './network.png';


const UserSignup = () => {
    const [data, setData] = useState({
        userName: "",
        email: "",
        userAct: "User",
        password: "",
      });
    
      const [error, setError] = useState("");
      const navigate = useNavigate();
    
      const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
      }
    
       const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const url = "http://localhost:8080/api/users/";
          const {data: res} = await axios.post(url, data);
          navigate("/");
          console.log(res.message);
        }catch(error){
          if(
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ){
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
        <h3 className="text-xl font-bold text-gray-900 mb-4">Sign Up With User</h3>

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
          
          <h3 className="font-semibold text-center"><Link to="/signup" className=" text-[#005A9C] hover:underline">Register With Student Account</Link></h3>
          <button type="submit" className="w-full mt-6 py-2 px-4 bg-[#005A9C] text-white rounded-lg hover:bg-[#004080] focus:outline-none focus:ring-4 focus:ring-[#005A9C]">
            Sign Up
          </button>

          <div className="flex justify-between items-center mt-4">
            <Link to="/" className="text-sm text-[#005A9C] hover:underline">Already have an account? Log in here.</Link>
          </div>
        </form>
      </div>
    </div>
 

  )
}

export default UserSignup