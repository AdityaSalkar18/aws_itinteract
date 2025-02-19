
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { SubdomainContext } from '../SubdomainContext';
const Update = () => {

  const { subdomain } = useContext(SubdomainContext);
  const [updates, setUpdates] = useState([]);

  const [formData, setFormData] = useState({
    sd: subdomain,
    desc: ""
  });


  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  //add update

  const openModal = () => {
    document.getElementById("crud-modal").classList.remove("hidden");
  };

  const toggleModal = () => {
    const modal = document.getElementById("crud-modal");
    modal.classList.toggle("hidden");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateFormData = { ...formData, sd: subdomain };
      const url = `${import.meta.env.VITE_APP_API_URL}/update`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update share:", data);
      setSuccessMessage("Update shared successfully");
      setError("");

      // Automatically close alert and modal after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");

        // Close modal after successful message submission
        const modal = document.getElementById("crud-modal");
        modal.classList.add("hidden"); // Add the "hidden" class to close the modal
      }, 2000);
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
      console.error("Error sharing update:", error);

      // Automatically close alert after 2 seconds
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };


  //fetch update

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/update`);
        setUpdates(response.data);
      } catch (error) {
        console.error('Error fetching updates:', error);
      }
    };

    fetchData();
  }, []);

  const filteredUpdates = updates.filter(update => update.sd === subdomain);
  return (
    <>

      <div className="container mx-auto px-4 my-8 mt-28">
        <div
          className="container mx-auto px-4 my-8"
          style={{
            textAlign: "center",
          }}
        >
          <ul

            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              padding: 0,
              margin: 0,
            }}
          >
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
            <li>
              <Link
                to="/professionalprofiles"
                style={{
                  color: "#005A9C",
                  textDecoration: "none",
                  fontSize: "16px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  backgroundColor: "#F5F5F5",
                }}
              >
                Professional
              </Link>
            </li>
          </ul>

          <div className='mt-8' >
            {/* <a href="#" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="w-full max-w-4xl inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="w-full">Add Update, Ask questions, Share errors, Add Job Post, Upload Video Lecture</span>
            </a> */}

            <Link onClick={openModal} class="w-full max-w-4xl inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="w-full">Add Update, Ask questions, Share errors, Add Job Post, Upload Video Lecture</span>
            </Link>

          </div>

        </div>


        <div className="container mx-auto px-4 my-8 flex flex-col items-center justify-center">

          {Array.isArray(updates) && updates.length > 0 ? (
            filteredUpdates.map((update) => (

              <div className="block w-full max-w-4xl p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                key={update._id}>
                <Link to={`/updateview/${update._id}`} >
                  <div>

                    <div className="flex">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                        alt="User"
                      />

                      <div className="ms-3 font-normal">
                        <h5 className="font-semibold text-gray-900 dark:text-white">{update.name}</h5>

                        <p className="mb-2 text-sm text-gray-400 font-normal">[{update.sd}] {update.date}</p>
                      </div>
                    </div>
                    <p>
                      {update.desc}
                    </p>
                  </div>
                </Link>
              </div>

            ))
          ) : (
            <p style={{ color: "#005A9C" }}>No Updates Found.</p>
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Update
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
                    Update Description
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write update description here"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-[#005A9C] hover:bg-[#00407A] focus:ring-4 focus:outline-none focus:ring-[#00407A] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add
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

export default Update