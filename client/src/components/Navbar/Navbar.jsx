import React, { useContext,useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SubdomainContext } from '../SubdomainContext';
import networkLogo from './network.png';

const Navbar = () => {

  const { setSubdomain } = useContext(SubdomainContext);
  const [isActive, setIsActive] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };


  const checkModal = () => {
    const modal = document.getElementById('drawer-top-example');
    if (isActive) {
      modal.classList.add('show');
      modal.style.display = 'block';
    } else {
      modal.classList.remove('show');
      modal.style.display = 'none';
      setIsActive(true);
    }
  }

  const handleSubdomainChange = (subdomain) => {
    setIsActive(false);
    checkModal();
    setSubdomain(subdomain);
  };




  const [userProfile, setUserProfile] = useState({
    name: "",
   
    email: "",


  });

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
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getProfile();
  }, []);

  return (


    <>

      <nav class="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-50  ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={networkLogo} class="h-8" alt="ITInteract" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ITInteract</span>
          </Link>
          <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span class="sr-only">Open user menu</span>
              <img class="w-8 h-8 rounded-full" src= "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" alt="user photo" />
            </button>

            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
              <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">{userProfile.name ? userProfile.name : "User Name"} </span>
                <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{userProfile.email ? userProfile.email : "Email"}</span>
                <Link className="text-sm text-[#005A9C]">
  <span>Edit Profile</span>
</Link>

              </div>
              <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link to="/myupdates" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Updates</Link>
                </li>
                <li>
                  <Link to="/mytasks" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Task</Link>
                </li>
                <li>
                  <Link to="/taskimpact" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Task Impact</Link>
                </li>
                <li>
                  <Link to="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogout}>Sign out</Link>
                </li>
              </ul>
            </div>
            <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/home" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Home</Link>
              </li>

              <li>
                <Link to="/account" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Account</Link>
              </li>
              <li>
                <Link onClick={() => {
                  setIsActive(!isActive);
                  checkModal()
                }} data-drawer-target="drawer-top-example" data-drawer-show="drawer-top-example" data-drawer-placement="top" aria-controls="drawer-top-example" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Domain
                </Link>

              </li>
              <li>
                <Link to="/messagesrecive" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Notification</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>



      <div id="drawer-top-example" class="fixed top-0 left-0 right-0 z-40 w-full p-4 my-16  transition-transform -translate-y-full bg-white dark:bg-gray-800 " tabindex="-1" aria-labelledby="drawer-top-label">
        <h5 id="drawer-top-label" class="inline-flex items-center  text-base font-semibold text-gray-500 dark:text-gray-400 m-3">Domain - SubDomain</h5>
        {/* <button type="button" data-drawer-hide="drawer-top-example" aria-controls="drawer-top-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <span class="sr-only">Close menu</span>
   </button> */}
        <div>


          <div className="grid gap-4  grid-cols-1 md:grid-cols-3">

            <div className="flex items-start">
              <div className="bg-gray-200 text-gray-800 inline-flex items-center justify-center text-2xl flex-shrink-0 mr-3"></div>
              <div>
                <h6 className="text-lg text-gray-400">Software Development</h6>
                <p><Link to="/updates" className="text-gray-400 no-underline py-1 " onClick={() => { handleSubdomainChange('BackendDevelopment'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Backend Development</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline py-1 " onClick={() => { handleSubdomainChange('FrontendDevelopment'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Frontend Development</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline py-1 " onClick={() => { handleSubdomainChange('FullStackDevelopment'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Full Stack Development</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline py-1 " onClick={() => { handleSubdomainChange('MobileAppDevelopment'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Mobile App Development</Link></p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-200 text-gray-800 inline-flex items-center justify-center text-2xl flex-shrink-0 mr-3"></div>
              <div>
                <h6 className="text-lg text-gray-400">Data Science</h6>
                <p><Link to="/updates" className="text-gray-400 no-underline py-1 " onClick={() => { handleSubdomainChange('DataAnalysis'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Data Analysis</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline py-1 " onClick={() => { handleSubdomainChange('MachineLearning'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Machine Learning</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline py-1 " onClick={() => { handleSubdomainChange('ArtificialIntelligence'); document.getElementById('drawer-top-example').classList.remove('show'); }}> Artificial Intelligence</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline py-1 " onClick={() => { handleSubdomainChange('DataEngineering'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Data Engineering</Link></p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-200 text-gray-800 inline-flex items-center justify-center text-2xl flex-shrink-0 mr-3"></div>
              <div>
                <h6 className="text-lg text-gray-400">Cybersecurity</h6>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('SecurityAnalysis'); document.getElementById('drawer-top-example').classList.remove('show'); }} >Security Analysis</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('EthicalHacking'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Ethical Hacking</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('IncidentResponse'); document.getElementById('drawer-top-example').classList.remove('show'); }}> Incident Response</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('Governance'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Governance</Link></p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-200 text-gray-800 inline-flex items-center justify-center text-2xl flex-shrink-0 mr-3"></div>
              <div>
                <h6 className="text-lg text-gray-400">Database Management</h6>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('DatabaseAdministration'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Database Administration</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('DataEngineering'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Data Engineering</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('DatabaseDevelopment'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Database Development</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('DataAnalysis'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Data Analysis</Link></p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-200 text-gray-800 inline-flex items-center justify-center text-2xl flex-shrink-0 mr-3"></div>
              <div>
                <h6 className="text-lg text-gray-400">Cloud Computing</h6>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('CloudEngineering'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Cloud Engineering</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('CloudArchitecture'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Cloud Architecture</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('CloudSecurity'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Cloud Security</Link></p>
                <p><Link to="/updates" className="text-gray-400 no-underline  py-1 " onClick={() => { handleSubdomainChange('CloudAdministration'); document.getElementById('drawer-top-example').classList.remove('show'); }}>Cloud Administration</Link></p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center h-full">
          <button
            type="button"
            data-drawer-hide="drawer-top-example"
            aria-controls="drawer-top-example"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 dark:hover:bg-gray-600 dark:hover:text-white"
            style={{ padding: '0' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-chevron-double-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
              />
            </svg>
          </button>
        </div>


      </div>
    </>
  )
}

export default Navbar