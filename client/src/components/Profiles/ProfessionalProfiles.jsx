import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import { SubdomainContext } from '../SubdomainContext';

const ProfessionalProfile = () => {

  const [profiles, setProfiles] = useState([]);
  const { subdomain } = useContext(SubdomainContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/profile/complete/user`);
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching complete profiles:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProfiles = profiles.filter(profile => profile.subdomain === subdomain);



  //MSG

  const openModal = () => {
    document.getElementById("crud-modal").classList.remove("hidden");
  };

  const toggleModal = () => {
    const modal = document.getElementById("crud-modal");
    modal.classList.toggle("hidden");
  };

  // State variables
  const [reciverid, setReciverid] = useState(null);
  const [recivername, setRecivername] = useState(null);
  const [formData, setFormData] = useState({
    reciverid: "",
    recivername: "",
    msg: "",
  });

  const [loginuserProfile, setLoginUserProfile] = useState({
    name: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!reciverid) {
      setError("User is not valid");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_APP_API_URL}/notification`;

      const payload = {
        reciverid: reciverid,
        recivername: recivername,
        msg: formData.msg,
      };

      // Send POST request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      // Check response status
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Message sent:", data);

      // Success handling
      setSuccessMessage("Message sent successfully");
      setError("");

      // Close modal and clear success message after 2 seconds
      setTimeout(() => {
        const modal = document.getElementById("crud-modal");
        modal.classList.add("hidden"); // Hide the modal
        setSuccessMessage(""); // Clear success message
      }, 2000);

      // Reset form data
      setFormData({
        reciverid: "",
        recivername: "",
        msg: "",
      });
    } catch (error) {
      // Error handling
      setError(error.message);
      setSuccessMessage("");
      console.error("Error sending message:", error);
    }
  };

  const handleOpenMessageModel = (profileid, profilename) => {
    setReciverid(profileid);
    setRecivername(profilename);

  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const url = `${import.meta.env.VITE_APP_API_URL}/profile/get-my-profile`; // Update the URL to your backend server running on port 8080
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLoginUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getProfile();
  }, []);


  //


  return (
    <>

      <div className="container mx-auto px-4 my-8 mt-28" style={{ textAlign: "center" }}>
        <ul
          style={{
            listStyle: "none", // Remove bullet points
            display: "flex",
            justifyContent: "center", // Center horizontally
            gap: "20px", // Space between items
            padding: 0,
            margin: 0,
          }}
        >
          <li>
            <Link
              to="/updates"
              style={{
                color: "#005A9C", // Text color
                textDecoration: "none", // Remove underline
                fontSize: "16px",
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#F5F5F5", // Light grey background for the link
              }}
            >
              Update
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              style={{
                color: "#005A9C",
                textDecoration: "none",
                fontSize: "16px",
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#F5F5F5",
              }}
            >
              Task
            </Link>
          </li>
          <li>
            <Link
              to="/studentprofiles"
              style={{
                color: "#005A9C",
                textDecoration: "none",
                fontSize: "16px",
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#F5F5F5",
              }}
            >
              Student
            </Link>
          </li>
        </ul>
      </div>





      <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {Array.isArray(profiles) && profiles.length > 0 ? (
    filteredProfiles.map((profile) => (
      <div key={profile._id} className="mb-4">
        <Link to={`/profileview/${profile._id}`}>
          <div className="card bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col items-center pb-6">
              <img
                className="w-32 h-32 mb-3 rounded-full shadow-lg"
                src={
                  profile.uimg
                    ? profile.uimg
                    : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                }
                alt="User"
              />
              <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                {profile.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {profile.tech ? profile.tech : "tech"}
              </span>
              <div className="flex mt-4">
                <p className="text-gray-600 text-sm">
                  {profile.bio ? profile.bio : "bio"}
                </p>
              </div>
              <p>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#005A9C", // Your custom color
                  }}
                  onClick={() => {
                    openModal();
                    handleOpenMessageModel(profile._id, profile.name);
                  }}
                  className="inline-flex items-center hover:text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chat-right-text mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                  </svg>
                  Message
                </Link>
              </p>
            </div>
          </div>
        </Link>
      </div>
    ))
  ) : (
    <p style={{ color: "#005A9C" }}>
      No User profiles found for this subdomain.
    </p>
  )}
</div>










        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="hidden fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden w-full h-screen bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-md max-h-full p-4">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {error && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Error: </span> {error}
                </div>
              )}
              {successMessage && (
                <div
                  className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <span className="font-medium">Success: </span> {successMessage}
                </div>
              )}

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-2"
                    src={
                      loginuserProfile.imageUrl ||
                      "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                    }
                    alt={loginuserProfile.name || "User"}
                  />
                  {loginuserProfile.name || "User Name"}
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="col-span-2 mb-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Add Message
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write update description here"
                    name="msg"
                    value={formData.msg}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-[#005A9C] hover:bg-[#00407A] focus:ring-4 focus:outline-none focus:ring-[#00407A] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>


      </div>



    </>
  )
}

export default ProfessionalProfile