import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


const UpdateView = () => {
  const { id } = useParams();
  const [update, setUpdate] = useState({});
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    uid: id,
    msg: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //fetch update 

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/update/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUpdate(data);
        } else {
          throw new Error('Faild to fetch update');
        }

      } catch (error) {
        console.error('Error fecthing update:', error);

      }
    };
    fetchUpdate();
  }, [id]);



  //comment part
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentFormData = { ...formData, uid: id };
  
      const url = `${import.meta.env.VITE_APP_API_URL}/comment`;
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(commentFormData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("comment share:", data);
      setSuccessMessage("Comment added successfully");
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
      console.log("Error adding comment:", error);
    }
  };
  
  
  useEffect(() => {
    let timer;
    if (successMessage || error) {
      timer = setTimeout(() => {
        setSuccessMessage("");
        setError("");
      }, 2000); // 2 seconds
    }
  
    return () => clearTimeout(timer);
  }, [successMessage, error]);


  //fetch comment
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/comment`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);

      }
    };
    fetchData();
  }, []);

  const filteredComments = comments.filter(comments => comments.uid === id);
  return (
    <>
      <div >
        <div className="container mx-auto px-4 my-8 mt-28 flex justify-center">
          <div className="block w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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

            <br />
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

            <form onSubmit={handleSubmit}>
              <label htmlFor="chat" className="sr-only">Your message</label>
              <div className="flex items-center py-2 rounded-lg dark:bg-gray-700">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                  alt="User"
                />
                <textarea
                  id="chat"
                  rows="1"
                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="msg"
                  value={formData.msg}
                  onChange={handleChange}
                  placeholder="Add Comment"
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



        <div className="container mx-auto px-4 my-8 flex flex-col items-center justify-center">
          {Array.isArray(comments) && comments.length > 0 ? (
            filteredComments.map((comment) => (
              <div
                id="toast-message-cta"
                className="block w-full max-w-4xl p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                role="alert"
                key={comment._id} // Ensure to add a key for each comment
              >
                <div className="flex">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                    alt="User"
                  />
                  <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {comment.name}
                    </span>
                    <p className="mb-2 text-sm text-gray-400 font-normal">{comment.date}</p>
                    <div className="mb-2 text-sm font-normal">
                      {comment.msg}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Comments Found.</p>
          )}
        </div>




      </div>

    </>
  )
}

export default UpdateView