import React, { useState, useEffect } from 'react';

const ProfileForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        act: "",
        domain: "",
        subdomain: "",
        tech: "",
        email: "",
        phone: "",
        bio: "",
        uimg: "",

        github: "",
        linkedin: "",
        cmail: "",
        cphone: "",
        link: "",

        pone: "",
        plone: "",
        ptwo: "",
        pltwo: "",
        pthree: "",
        plthree: "",

        cone: "",
        cdone: "",
        ctwo: "",
        cdtwo: "",
        cthree: "",
        cdthree: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [subdomains, setSubdomains] = useState([]);
    const [techs, setTechs] = useState([]);

    const domainToSubdomainMap = {
        SoftwareDevelopment: ["FrontendDevelopment", "BackendDevelopment", "FullStackDevelopment", "MobileAppDevelopment"],
        DataScience: ["DataAnalysis", "MachineLearning", "ArtificialIntelligence", "DataEngineering"],
        Cybersecurity: ["SecurityAnalysis", "EthicalHacking", "IncidentResponse", "Governance"],
        DatabaseManagement: ["DatabaseAdministration", "DataEngineering", "DatabaseDevelopment", "DataAnalysis"],
        CloudComputing: ["CloudEngineering", "CloudArchitecture", "CloudSecurity", "CloudAdministration"],
    };

    const subdomainToTechMap = {
        FrontendDevelopment: ["HTML", "CSS", "JavaScript", "React", "Vue.js"],
        BackendDevelopment: ["Node.js", "Django", "Ruby on Rails", "Spring Boot"],
        DataAnalysis: ["Power BI", "Tableau", "Pandas", "Matplotlib"],
        MachineLearning: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Model Optimization"],
        ArtificialIntelligence: ["Expert Systems", "Fuzzy Logic", "Robotics", "AI Chatbots"],
        DataEngineering: ["ETL Processes", "Data Warehousing", "Data Pipelines", "Big Data Frameworks"],
        SecurityAnalysis: ["Penetration Testing", "Vulnerability Assessment", "Risk Management", "Threat Hunting"],
        EthicalHacking: ["Social Engineering", "Network Hacking", "Web Application Hacking", "Wireless Hacking"],
        CloudEngineering: ["AWS", "Google Cloud", "Azure", "Cloud Automation"],
        CloudSecurity: ["Identity and Access Management", "Cloud Encryption", "Cloud Monitoring", "Cloud Threat Intelligence"]
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${import.meta.env.VITE_APP_API_URL}/profile/edit-my-profile`;
            const formDataUpload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataUpload.append(key, value);
            });

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formDataUpload,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setSuccessMessage("Profile updated successfully");
            setError("");

            setTimeout(() => setSuccessMessage(""), 2000);

        } catch (error) {
            setError(error.message);
            setSuccessMessage("");
            setTimeout(() => setError(""), 2000);
        }
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const url = `${import.meta.env.VITE_APP_API_URL}/profile/get-my-profile`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        getProfile();
    }, []);

    useEffect(() => {
        setSubdomains(domainToSubdomainMap[formData.domain] || []);
        setFormData((prevData) => ({ ...prevData, subdomain: "" }));
    }, [formData.domain]);

    useEffect(() => {
        setTechs(subdomainToTechMap[formData.subdomain] || []);
        setFormData((prevData) => ({ ...prevData, tech: "" }));
    }, [formData.subdomain]);

    return (
        <>
            
            <div className="container mx-auto my-8  px-4">
                <div className="container px-4 py-3">
                    {error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">Danger alert!</span> {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span className="font-medium">Success alert!</span> {successMessage}
                        </div>
                    )}




                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name</label>
                            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="first last" name="name" value={formData.name} onChange={handleChange} required />
                        </div>



                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="inputImage">Upload Profile Image</label>
                        <input
                            class="block w-full text-sm text-gray-900 border border-gray-50 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help"
                            type="file"
                            name="image"
                            className="form-file-input"
                            id="inputImage"
                            accept="image/*"
                            onChange={handleChange} />
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>



                        <div>
                            <label
                                htmlFor="accountType"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Account Type
                            </label>
                            <select
                                id="accountType"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="act"
                                value={formData.act}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Account Type
                                </option>
                                <option value="Student">Student</option>
                                <option value="User">User</option>
                            </select>
                        </div>


                        <div className="max-w-full mx-auto grid grid-cols-3 gap-6 py-4">


                            <div>
                                <label
                                    htmlFor="domain"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Domain
                                </label>
                                <select
                                    id="domain"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="domain"
                                    value={formData.domain}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        Select Domain
                                    </option>
                                    <option value="SoftwareDevelopment">Software Development</option>
                                    <option value="DataScience">Data Science</option>
                                    <option value="Cybersecurity">Cybersecurity</option>
                                    <option value="DatabaseManagement">Database Management</option>
                                    <option value="CloudComputing">Cloud Computing</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="subdomain"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Subdomain
                                </label>
                                <select
                                    id="subdomain"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="subdomain"
                                    value={formData.subdomain}
                                    onChange={handleChange}
                                    disabled={!formData.domain}
                                >
                                    <option value="" disabled>
                                        Select Subdomain
                                    </option>
                                    {subdomains.map((subdomain, i) => (
                                        <option key={i} value={subdomain}>
                                            {subdomain}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="tech"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Select Tech
                                </label>
                                <select
                                    id="tech"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="tech"
                                    value={formData.tech}
                                    onChange={handleChange}
                                    disabled={!formData.subdomain}
                                >
                                    <option value="" disabled>
                                        Select Tech
                                    </option>
                                    {techs.map((tech, i) => (
                                        <option key={i} value={tech}>
                                            {tech}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>



                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Email address</label>
                            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" placeholder="name@example.com" name="email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div class="mb-6">
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Phone No</label>
                            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>


                        <div class="mb-6">
                            <label for="bio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Bio</label>
                            <textarea rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tell something about yourself" name="bio" value={formData.bio} onChange={handleChange}></textarea>
                        </div>

                        <div class="mb-6">
                            <label for="github" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter GitHub</label>
                            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="url" placeholder="GitHub" name="github" value={formData.github} onChange={handleChange} />
                        </div>

                        <div class="mb-6">
                            <label for="linkedin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Linkedin</label>
                            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="url" placeholder="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                        </div>


                        <div class="mb-6">
                            <label for="cmail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter  Contact Email address</label>
                            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" placeholder="name@example.com" name="cmail" value={formData.cmail} onChange={handleChange} />
                        </div>
                        <div class="mb-6">
                            <label for="cphone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Contact Phone No </label>
                            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="0123456789" name="cphone" value={formData.cphone} onChange={handleChange} />
                        </div>
                        <div class="mb-6">
                            <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter  Email address</label>
                            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="url" placeholder="myprotfolio.com" name="link" value={formData.link} onChange={handleChange} />
                        </div>



                        <h6 class="text-lg font-bold dark:text-white mb-3">Projects</h6>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="project_one" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project One</label>
                                <input type="text" id="project_one" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project One" name="pone" value={formData.pone} onChange={handleChange} />
                            </div>
                            <div>
                                <label for="project_link_one" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Link One</label>
                                <input type="url" id="project_link_one" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project Link One" name="plone" value={formData.plone} onChange={handleChange} />
                            </div>
                            <div>
                                <label for="project_two" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Two</label>
                                <input type="text" id="project_two" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project Two" name="ptwo" value={formData.ptwo} onChange={handleChange} />
                            </div>
                            <div>
                                <label for="project_link_two" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Link Two</label>
                                <input type="url" id="project_link_two" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project Link Two" name="pltwo" value={formData.pltwo} onChange={handleChange} />
                            </div>
                            <div>
                                <label for="project_three" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Three</label>
                                <input type="text" id="project_three" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project Three" name="pthree" value={formData.pthree} onChange={handleChange} />
                            </div>
                            <div>
                                <label for="project_link_three" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Link Three</label>
                                <input type="url" id="project_link_three" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project Link Three" name="plthree" value={formData.plthree} onChange={handleChange} />
                            </div>
                        </div>


                        <h6 class="text-lg font-bold dark:text-white mb-3">Certifiaction / Job Experience</h6>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="cone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Certification One
                                </label>
                                <input
                                    type="text"
                                    id="cone"
                                    name="cone"
                                    value={formData.cone}
                                    onChange={handleChange}
                                    placeholder="Certification One"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                />
                            </div>
                            <div>
                                <label htmlFor="cdone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Certification Date One
                                </label>
                                <input
                                    type="text"
                                    id="cdone"
                                    name="cdone"
                                    value={formData.cdone}
                                    onChange={handleChange}
                                    placeholder="Certification Date One"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                />
                            </div>
                            <div>
                                <label htmlFor="ctwo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Certification Two
                                </label>
                                <input
                                    type="text"
                                    id="ctwo"
                                    name="ctwo"
                                    value={formData.ctwo}
                                    onChange={handleChange}
                                    placeholder="Certification Two"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                />
                            </div>
                            <div>
                                <label htmlFor="cdtwo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Certification Date Two
                                </label>
                                <input
                                    type="text"
                                    id="cdtwo"
                                    name="cdtwo"
                                    value={formData.cdtwo}
                                    onChange={handleChange}
                                    placeholder="Certification Date Two"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                />
                            </div>
                            <div>
                                <label htmlFor="cthree" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Certification Three
                                </label>
                                <input
                                    type="text"
                                    id="cthree"
                                    name="cthree"
                                    value={formData.cthree}
                                    onChange={handleChange}
                                    placeholder="Certification Three"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                />
                            </div>
                            <div>
                                <label htmlFor="cdthree" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Certification Date Three
                                </label>
                                <input
                                    type="text"
                                    id="cdthree"
                                    name="cdthree"
                                    value={formData.cdthree}
                                    onChange={handleChange}
                                    placeholder="Certification Date Three"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                />
                            </div>
                        </div>


                        <button
                            type="submit"
                            class="text-white bg-[#005A9C] hover:bg-[#004a85] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#005A9C] dark:hover:bg-[#004a85] focus:outline-none dark:focus:ring-blue-800"
                        >
                            Update Profile
                        </button>


                    </form>
                </div>

            </div>

        </>
    )
}

export default ProfileForm