import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
const TaskView = () => {

  const { id } = useParams();

  const [task, setTask] = useState({});
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState({

    tid: id,
    tsd: task.sd,
    link: "",
    desc: "",
  });

  const [replies, setReplies] = useState({});

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  //fetch task 
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/task/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTask(data);
        } else {
          throw new Error('Faild to fetch task');
        }
      } catch (error) {
        console.error('Error fetching task:', error);

      }
    };
    fetchTask();

  }, [id]);


  //link part
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const linkFormData = { ...formData, tid: id, tsd: task.sd };

      const url = `${import.meta.env.VITE_APP_API_URL}/link`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(linkFormData),

      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("link share:", data);
      setSuccessMessage("link add successfully");
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
      console.log("Error adding link:", error);

    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the task ID (`id`) in the URL to fetch links by task
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/link/${id}`);
        setLinks(response.data); // Update the state with fetched links
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchData();
  }, [id]); // Re-run effect when `id` changes




  //reply part

  const openModal = () => {
    document.getElementById("crud-modal").classList.remove("hidden");
  };

  const toggleModal = () => {
    const modal = document.getElementById("crud-modal");
    modal.classList.toggle("hidden");
  };

  const handleReplyChange = (linkId, linkUId, linkSd, value) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [`${linkId}_${linkUId}_${linkSd}`]: value, // Use a unique key combining linkId, linkUId, and linkSd
    }));
  };

  const handleReplySubmit = async (e, linkId, linkUId, linkSd) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    try {
      const url = `${import.meta.env.VITE_APP_API_URL}/reply`;

      const replyContent = replies[`${linkId}_${linkUId}_${linkSd}`];

      if (!replyContent) {
        throw new Error("Reply content is required");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          lid: linkId,
          luid: linkUId,
          lsd: linkSd,
          reply: replyContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Feedback added:", data);
      setSuccessMessage("Feedback added successfully");
      setError("");


      setReplies((prevReplies) => ({
        ...prevReplies,
        [`${linkId}_${linkUId}_${linkSd}`]: "",
      }));


      setTimeout(() => {
        toggleModal();
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setError("Error adding feedback");
      setSuccessMessage("");
      console.error("Error adding feedback:", error);
    }
  };

  useEffect(() => {
    let timer;
    if (error || successMessage) {
      timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [error, successMessage]);


  return (
    <>
      <div >
        <div className="container mx-auto px-4 my-8 mt-28 flex justify-center">
          <div className="block w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
                [  {task.tr}]
              </p>
              <p>
                {task.tdesc}
              </p>
            </div>
            <br />

            <form onSubmit={handleSubmit}>
              <label htmlFor="chat" className="sr-only">Your message</label>
              <div className="flex items-center py-2 rounded-lg dark:bg-gray-700">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                  alt="User"
                />
                <input class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="link"
                  value={formData.link}
                  onChange={handleChange} placeholder="Add Code Link" />

                <textarea
                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  rows="1"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  placeholder="Add Desc "
                ></textarea>


                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-[#005A9C] rounded-full cursor-pointer hover:bg-[#E6F0FA] dark:text-[#005A9C] dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-5 h-5 rotate-90 rtl:-rotate-90"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span className="sr-only">Add Link</span>
                </button>


              </div>
            </form>
          </div>
        </div>



        <div className="container mx-auto px-4 my-8 flex justify-center">
          {Array.isArray(links) && links.length > 0 ? (
            links.map((link) => (
              <div
                key={link._id}
                id="toast-message-cta"
                className="block w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                role="alert"
              >
                <div className="flex">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                    alt="User"
                  />

                  <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {link.name}
                    </span>
                    <p className="mb-2 text-sm text-gray-400 font-normal">{link.date} </p>
                    <div className="mb-2 text-sm font-normal">
                      <Link className="text-[#005A9C] hover:underline" to={link.link} target="_blank" rel="noopener noreferrer" >
                        {link.link}
                      </Link>
                    </div>

                    <div className="mb-3 text-sm font-normal">
                      {link.desc}
                    </div>


                    {/* <Link
                     
                     data-bs-toggle="modal"
                      data-bs-target={`crud-modal-${link._id}`} // Unique modal target
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-send-fill mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                      </svg>
                      Feedback
                    </Link> */}

                    <div className="flex justify-end">
                      <Link
                        onClick={openModal}
                        data-bs-target={`crud-modal-${link._id}`} // Unique modal target
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-[#005A9C] rounded-lg hover:bg-[#004080] focus:ring-4 focus:outline-none focus:ring-[#66A3D2] dark:bg-[#005A9C] dark:hover:bg-[#003366] dark:focus:ring-[#003366]"
                      >
                        Feedback
                      </Link>
                    </div>




                  </div>
                </div>





                <div
                  id="crud-modal"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="hidden fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50"
                >
                  <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
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
                      <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Add Feedback on Link
                        </h3>
                        <button
                          onClick={toggleModal}
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                      <form onSubmit={(e) => handleReplySubmit(e, link._id, link.upid, link.tasksd)}>
                        <div className="mb-6 p-4 ">
                          <label
                            htmlFor={`feedback-${link._id}`}
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Give Feedback
                          </label>
                          <select
                            id={`feedback-${link._id}`}
                            className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={replies[`${link._id}_${link.upid}_${link.tasksd}`] || ""}
                            onChange={(e) => handleReplyChange(link._id, link.upid, link.tasksd, e.target.value)}
                          >
                            <option value="" disabled>
                              Give feedback
                            </option>
                            <option value="100">High</option>
                            <option value="70">Medium</option>
                            <option value="30">Low</option>
                          </select>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 m-2 text-sm font-medium text-white bg-[#005A9C] rounded-lg hover:bg-[#004A82] focus:ring-4 focus:outline-none focus:ring-[#0073C5] dark:bg-[#005A9C] dark:hover:bg-[#004A82] dark:focus:ring-[#0073C5]"
                          >
                            Submit
                          </button>

                        </div>
                      </form>
                    </div>
                  </div>
                </div>












              </div>

            ))
          ) : (
            <p>No Links Found.</p>
          )}









        </div>



      </div>

    </>
  )
}

export default TaskView