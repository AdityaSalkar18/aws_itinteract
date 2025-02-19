import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const MyUpdate = () => {

    const [updates, setUpdates] = useState([]);
    const [currentUpdateId, setCurrentUpdateId] = useState(null); // State for storing the current update id
    const [formData, setFormData] = useState({
        desc: ""
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [alert, setAlert] = useState({ message: '', type: '' });



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/update/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`

                    }
                });


                setUpdates(response.data);
            } catch (error) {
                console.error('Error fetching updates:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/update/${id}`, {
                headers: {

                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setUpdates((prevUpdates) => prevUpdates.filter(update => update._id !== id));
                setAlert({ message: 'Update deleted successfully!', type: 'success' });


            } else {
                throw new Error(`Failed to delete, status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting update:', error);
            setAlert({ message: 'Failed to delete update.', type: 'danger' });
        }
    };


    // // Handle form data change

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
            const url = `http://localhost:8080/api/update/${currentUpdateId}`; // Use the currentUpdateId
            const response = await axios.patch(url, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                setSuccessMessage("Update successfully saved");
                setError("");
    
                // Refresh the list of updates
                const updatedList = updates.map((update) =>
                    update._id === currentUpdateId ? { ...update, desc: formData.desc } : update
                );
                setUpdates(updatedList);
    
                // Close the modal after 2 seconds
                setTimeout(() => {
                    toggleModal(); // Close the modal
                    setSuccessMessage(""); // Clear the success message
                }, 2000);
            } else {
                throw new Error(`Failed to update, status code: ${response.status}`);
            }
        } catch (error) {
            setError(error.message);
            setSuccessMessage("");
            console.error("Error updating profile:", error);
        }
    };
    
    useEffect(() => {
        if (alert.message) {
            setTimeout(() => {
                setAlert({ message: "", type: "" });
            }, 2000);
        }
    }, [alert]);
    
    return (
        <div className="container mx-auto px-4 my-8 mt-28">

            <div className="container mx-auto px-4 my-8 flex flex-col items-center justify-center">
                {alert.message && (
                    <div
                        className={`p-4 mb-4 text-sm rounded-lg ${alert.type === 'success'
                            ? 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400'
                            : 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400'
                            }`}
                        role="alert"
                    >
                        <span className="font-medium">
                            {alert.type === 'success' ? 'Success: ' : 'Error: '}
                        </span>
                        {alert.message}
                        <button
                            type="button"
                            className="float-right text-gray-500 hover:text-gray-900 dark:hover:text-white mx-2"
                            onClick={() => setAlert({ message: '', type: '' })}
                            aria-label="Close"
                        >
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                )}


                {Array.isArray(updates) && updates.length > 0 ? (
                    updates.map((update) => (

                        <div className="block w-full max-w-4xl p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                            key={update._id}>
                            <Link to={`/updateview/${update._id}`} >
                                <div>

                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                                            alt="User"
                                        />

                                        <div className="ms-3 font-normal">
                                            <h5 className="font-semibold text-gray-900 dark:text-white">{update.name}</h5>
                                            <p className="mb-2 text-sm text-gray-400 font-normal">
                                                [{update.sd}] {update.date}
                                            </p>
                                        </div>

                                        <div className="ml-auto flex space-x-4">
                                            <Link
                                                to=""
                                                className="text-end mx-2"
                                                style={{ color: "#005A9C" }}
                                                onClick={() => {
                                                    setCurrentUpdateId(update._id);
                                                    setFormData({ desc: update.desc });
                                                    openModal();
                                                }}
                                            >
                                                Update
                                            </Link>


                                            <Link
                                                to=""
                                                className="text-end mx-2"
                                                style={{ color: "#005A9C" }}
                                                onClick={() => handleDelete(update._id)}
                                            >
                                                Delete
                                            </Link>

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
                                Edit Update
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
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default MyUpdate