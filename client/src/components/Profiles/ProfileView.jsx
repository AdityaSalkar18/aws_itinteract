import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from "react-router-dom";

const ProfileView = () => {

    const { id } = useParams();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/profile/${id}`); // Adjust the API route as per your setup
                if (response.ok) {
                    const data = await response.json();
                    setUserProfile(data);
                } else {
                    throw new Error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                // Handle error (e.g., show error message)
            }
        };

        fetchProfile();
    }, [id]);



    //MSG
    const [reciverid, setReciverid] = useState(null);
    const [recivername, setRecivername] = useState(null);
    const [formData, setFormData] = useState({

        reciverid: "",
        recivername: "",
        msg: ""
    });

    const [loginuserProfile, setLoginUserProfile] = useState({
        name: "",

    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    }

    const handleSubmit = async (e, id, name) => {
        e.preventDefault();
        if (!id) {
            setError("User is not valid");
    
            // Clear error after 2 seconds
            setTimeout(() => setError(""), 2000);
            return;
        }
    
        try {
            const url = "http://localhost:8080/api/notification";
    
            const payload = {
                reciverid: id,
                recivername: name,
                msg: formData.msg,
            };
    
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Message sent:", data);
    
            setSuccessMessage("Message sent successfully");
            setError("");
    
            // Clear success message after 2 seconds
            setTimeout(() => setSuccessMessage(""), 2000);
        } catch (error) {
            setError(error.message);
            setSuccessMessage("");
    
            // Clear error after 2 seconds
            setTimeout(() => setError(""), 2000);
            console.error("Error sending message:", error);
        }
    };
    



    useEffect(() => {
        const getProfile = async () => {
            try {
                const url = "http://localhost:8080/api/profile/get-my-profile"; // Update the URL to your backend server running on port 8080
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


    return (
        <>


            <div className="container mx-auto px-4 py-8 mt-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="card mb-4 bg-white shadow-md rounded-lg col-span-1">
                        <div className="flex justify-end px-4 pt-4">
                          
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-44 h-44 mb-3 rounded-full shadow-lg" src={userProfile.uimg ? userProfile.uimg : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"} alt="Bonnie image" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userProfile.name ? userProfile.name : "User Name"}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{userProfile.tech ? userProfile.tech : "tech"}</span>
                            <div className="flex mt-4 md:mt-6">
                                <p className="text-muted mb-2">{userProfile.bio ? userProfile.bio : "bio"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 bg-white shadow-md rounded-lg p-6">
                        <div className="mb-5">
                            <p className="font-medium">Account</p>
                            <p className="text-gray-600">{userProfile.act ? userProfile.act : "Account type"}</p>
                        </div>

                        <div className="mb-5">
                            <p className="font-medium">Domain</p>
                            <p className="text-gray-600">{userProfile.domain ? userProfile.domain : "Domain"}</p>
                        </div>

                        <div className="mb-5">
                            <p className="font-medium">Sub Domain</p>
                            <p className="text-gray-600">{userProfile.subdomain ? userProfile.subdomain : "Sub Domain"}</p>
                        </div>

                        <div className="mb-5">
                            <p className="font-medium">Email</p>
                            <p className="text-gray-600">{userProfile.email ? userProfile.email : "Email"}</p>
                        </div>

                        <div className="mb-5">
                            <p className="font-medium">Mobile</p>
                            <p className="text-gray-600">{userProfile.phone ? userProfile.phone : "Mobile no"}</p>
                        </div>
                    </div>




                    <div className="card mb-4 bg-white shadow-md rounded-lg">
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush rounded-3">

                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <div className="d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                        </svg>
                                        <span>
                                            <Link
                                                className="mb-0 text-gray-600"
                                                style={{ textDecoration: "none" }}
                                                to={userProfile.github ? userProfile.github : "https://github.com/username"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {userProfile.github ? userProfile.github : "github.com/username"}
                                            </Link>
                                        </span>

                                    </div>
                                </li>


                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                    </svg>

                                    <span>
                                        <Link
                                            className="mb-0 text-gray-600"
                                            style={{ textDecoration: "none" }}
                                            to={userProfile.linkedin ? userProfile.linkedin : "usernamelinkedin.com"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {userProfile.linkedin ? userProfile.linkedin : "usernamelinkedin.com"}
                                        </Link>
                                    </span>

                                </li>


                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                                    </svg>

                                    <span>
                                        <Link
                                            className="mb-0 text-gray-600"
                                            style={{ textDecoration: "none" }}
                                            to={userProfile.cmail ? `mailto:${userProfile.cmail}` : "mailto:user@example.com"}
                                        >
                                            {userProfile.cmail ? userProfile.cmail : "user@example.com"}
                                        </Link>
                                    </span>

                                </li>


                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                    </svg>


                                    <span>
                                        <Link
                                            className="mb-0 text-gray-600"
                                            style={{ textDecoration: "none" }}
                                            to={userProfile.cphone ? `tel:${userProfile.cphone}` : "tel:+123456789"}
                                        >
                                            {userProfile.cphone ? userProfile.cphone : "123456789"}
                                        </Link>
                                    </span>

                                </li>


                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792A4 4 0 0 1 5.143 4.57z" />
                                    </svg>

                                    <span>
                                        <Link
                                            className="mb-0 text-gray-600"
                                            style={{ textDecoration: "none" }}
                                            to={userProfile.link ? userProfile.link : "https://www.example.com"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {userProfile.link ? userProfile.link : "https://www.example.com"}
                                        </Link>
                                    </span>

                                </li>

                            </ul>
                        </div>
                    </div>


                </div>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card mb-4 bg-white shadow-md rounded-lg">
                    <form
    onSubmit={(e) => {
        handleSubmit(e, userProfile._id, userProfile.name);
    }}
>
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
    <div className="p-6">
        <p className="mb-5 font-medium flex items-center text-[#005A9C]">
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
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-2">
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

        <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            Add Your message
        </label>
        <textarea
            id="message"
            rows="5"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="msg"
            value={formData.msg}
            onChange={handleChange}
            placeholder="Write your message here..."
        ></textarea>

        <button
            type="submit"
            className="float-right text-white bg-[#005A9C] hover:bg-[#004080] focus:ring-4 focus:ring-[#005A9C]/50 font-medium rounded-lg text-sm px-5 py-2 m-2 dark:bg-[#005A9C] dark:hover:bg-[#003366] focus:outline-none dark:focus:ring-[#005A9C]/70"
        >
            Send
        </button>
    </div>
</form>


                    </div>


                    <div className="card mb-4 bg-white shadow-md rounded-lg">
                        <div className="p-6">
                            <p className="mb-5 font-medium">Project Status</p>
                            <p className="mb-2">{userProfile.pone ? userProfile.pone : "Project1 title"}</p>
                            <p className="mb-4 text-gray-600">{userProfile.plone ? userProfile.plone : "Project1 link"}</p>
                            <p className="mb-2">{userProfile.ptwo ? userProfile.ptwo : "Project2 title"}</p>
                            <p className="mb-4 text-gray-600">{userProfile.pltwo ? userProfile.pltwo : "Project2 link"}</p>
                            <p className="mb-2">{userProfile.pthree ? userProfile.pthree : "Project3 title"}</p>
                            <p className="mb-4 text-gray-600">{userProfile.plthree ? userProfile.plthree : "Project3 link"}</p>
                        </div>
                    </div>
                    <div className="card mb-4 bg-white shadow-md rounded-lg">
                        <div className="p-6">
                            <p className="mb-5 font-medium">Work Status</p>
                            <p className="mb-2">{userProfile.cone ? userProfile.cone : "Company1 name"}</p>
                            <p className="mb-4 text-gray-600">{userProfile.cdone ? userProfile.cdone : "Company1 desc"}</p>
                            <p className="mb-2">{userProfile.ctwo ? userProfile.ctwo : "Company2 name"}</p>
                            <p className="mb-4 text-gray-600">{userProfile.cdtwo ? userProfile.cdtwo : "Company2 desc"}</p>
                            <p className="mb-2">{userProfile.cthree ? userProfile.cthree : "Company3 name"}</p>
                            <p className="mb-4 text-gray-600">{userProfile.cdthree ? userProfile.cdthree : "Company3 desc"}</p>
                        </div>
                    </div>
                </div>


            </div>



        </>
    )
}

export default ProfileView