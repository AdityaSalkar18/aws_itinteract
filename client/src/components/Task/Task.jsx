import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { SubdomainContext } from '../SubdomainContext';

const Task = () => {

  const { subdomain } = useContext(SubdomainContext);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    sd: subdomain,
    tt: "",
    tc: "",
    tr: "",
    tdesc: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //fetch task

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/task');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchData();
  }, []);

  const filteredTasks = tasks.filter(task => task.sd === subdomain);


  //add task
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
      const taskFormData = { ...formData, sd: subdomain };
      const url = "http://localhost:8080/api/task";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskFormData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Task share:", data);
      setSuccessMessage("Task shared successfully");
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
      console.error("Error sharing task:", error);
  
      // Automatically close alert after 2 seconds
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  
  return (
    <>
      <div className="container mx-auto px-4 my-8 mt-28">

        <div className="container mx-auto px-4 my-8" style={{ textAlign: "center" }}>
          <ul
            style={{
              listStyle: "none", // Remove default bullet points
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
            {/* <Link  data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="w-full max-w-4xl inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="w-full">Add Task, Ask Questions, Share Errors, Add Challenges, Collaborate Projects</span>
            </Link> */}


            <Link onClick={openModal}  class="w-full max-w-4xl inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
             <span class="w-full">Add Task, Ask Questions, Share Errors, Add Challenges, Collaborate Projects</span>
            </Link>

          </div>
        </div>


        <div className="container mx-auto px-4 my-8 flex flex-col items-center justify-center">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div className="block w-full max-w-4xl p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <Link to={`/taskview/${task._id}`}>
                  <div>
                    <div className="relative w-full">
                      <div className="flex items-center">

                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                          alt="User"
                        />

                        <div className="ms-3 font-normal">
                          <h5 className="font-semibold text-gray-900 dark:text-white">{task.name}</h5>
                          <p className="mb-2 text-sm text-gray-400 font-normal"> <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{task.tc}</span>[{task.sd}] {task.date}  </p>

                        </div>

                      </div>

                      <span className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                        {task.tut}
                      </span>
                    </div>



                    <h6 className='mb-2 '>
                      {task.tt}
                    </h6>
                    <p className='mb-2'>
                      [  {task.tr.length > 50 ? task.tr.substring(0, 50) + "..." : task.tr}]
                    </p>

                    <p>
                      {task.tdesc.length > 100 ? task.tdesc.substring(0, 100) + "..." : task.tdesc}
                    </p>
                  </div>

                </Link>

              </div>


            ))
          ) : (
            <p style={{ color: "#005A9C" }}>No Task Found.</p>
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
          Add New Task
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
        <div className="col-span-2 mb-4">
          <label
            htmlFor="tt"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Task Title
          </label>
          <input
            id="tt"
            name="tt"
            type="text"
            value={formData.tt}
            onChange={handleChange}
            placeholder="Add Task Title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>

        <div className="col-span-2 mb-4">
          <label
            htmlFor="tc"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Task Complexity
          </label>
          <select
            id="tc"
            name="tc"
            value={formData.tc}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="Default">Default</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="col-span-2 mb-4">
          <label
            htmlFor="tr"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Task Requirement
          </label>
          <input
            id="tr"
            name="tr"
            type="text"
            value={formData.tr}
            onChange={handleChange}
            placeholder="Add Task Requirement"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>

        <div className="col-span-2 mb-4">
          <label
            htmlFor="tdesc"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Task Description
          </label>
          <textarea
            id="tdesc"
            name="tdesc"
            rows="3"
            value={formData.tdesc}
            onChange={handleChange}
            placeholder="Write task description here"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

export default Task