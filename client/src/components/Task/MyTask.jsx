import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyTask = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTaskId, setCurrentTaskId] = useState(null); // State for storing the current update id
    const [formData, setFormData] = useState({ tt: "", tc: "", tr: "", tdesc: "" });


    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [alert, setAlert] = useState({ message: "", type: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_API_URL}/task/user`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_APP_API_URL}/task/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.status === 200) {
                setTasks((prevTasks) =>
                    prevTasks.filter((task) => task._id !== id)
                );
                setAlert({ message: "Task deleted successfully!", type: "success" });
            }
        } catch (error) {
            console.error("Error deleting update:", error);
            setAlert({ message: "Failed to delete task.", type: "danger" });
        }
    };


    // update task
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
            const url = `${import.meta.env.VITE_APP_API_URL}/task/${currentTaskId}`; // Use the currentTaskId
            const response = await axios.patch(url, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSuccessMessage("Task successfully saved");
                setError("");

                // Refresh the list of tasks
                const updatedList = tasks.map((task) =>
                    task._id === currentTaskId
                        ? {
                            ...task,
                            tt: formData.tt,
                            tc: formData.tc,
                            tr: formData.tr,
                            tdesc: formData.tdesc,
                        }
                        : task
                );
                setTasks(updatedList);

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
            console.error("Error updating task:", error);
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

                {Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div className="block w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
                                                <p className="mb-2 text-sm text-gray-400 font-normal">
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                                                        {task.tc}
                                                    </span>
                                                    [{task.sd}] {task.date}
                                                </p>
                                            </div>

                                            <div className="ml-auto flex flex-col items-end space-y-2">
                                                <div className="ml-auto flex space-x-4">
                                                    <Link
                                                        to=""
                                                        style={{ color: "#005A9C" }}
                                                        className="text-end"
                                                        onClick={() => {
                                                            setCurrentTaskId(task._id);
                                                            setFormData({
                                                                tt: task.tt,
                                                                tc: task.tc,
                                                                tr: task.tr,
                                                                tdesc: task.tdesc,
                                                            });
                                                            openModal();
                                                        }}
                                                    >
                                                        Update
                                                    </Link>


                                                    <Link
                                                        to=""
                                                        style={{ color: "#005A9C" }}
                                                        className="text-end"
                                                        onClick={() => handleDelete(task._id)}
                                                    >
                                                        Delete
                                                    </Link>

                                                </div>

                                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                                                    {task.tut}
                                                </span>
                                            </div>
                                        </div>
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
                            <div className="mb-4">
                                <label
                                    htmlFor="tt"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Task Title
                                </label>
                                <input
                                    id="tt"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    type="text"
                                    name="tt"
                                    value={formData.tt}
                                    onChange={handleChange}
                                    placeholder="Add Task Title"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="tc"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Task Complexity
                                </label>
                                <select
                                    id="tc"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    name="tc"
                                    value={formData.tc}
                                    onChange={handleChange}
                                >
                                    <option value="Default">Default</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="tr"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Task Requirement
                                </label>
                                <input
                                    id="tr"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    type="text"
                                    name="tr"
                                    value={formData.tr}
                                    onChange={handleChange}
                                    placeholder="Task Requirement"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="tdesc"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Task Description
                                </label>
                                <textarea
                                    id="tdesc"
                                    rows="3"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    name="tdesc"
                                    value={formData.tdesc}
                                    onChange={handleChange}
                                    placeholder="Task Description"
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

export default MyTask