import { BrowserRouter ,  Route, Routes,useLocation } from 'react-router-dom';
import './App.css';

//Authentication
import Login from './components/Authentication/Login/Login';
import Signup from './components/Authentication/Signup/Signup';
import UserVerfifcation from './components/Authentication/Signup/UserVerfifcation';
import UserSignup from './components/Authentication/Signup/UserSignup';

//Home
import Home   from './components/Home/Home';

//Account
import Account from './components/Account/Account';
import ProfileForm from './components/Account/ProfileForm';

//Message
import MessagesSend from './components/Messages/MessagesSend';
import MessagesRecive from './components/Messages/MessagesRecive';

//Update
import Update from './components/Update/Update';
import UpdateView from './components/Update/UpdateView';
import MyUpdate from './components/Update/MyUpdate';

//Task
import Task from './components/Task/Task';
import TaskView from './components/Task/TaskView';
import MyTask from './components/Task/MyTask';
import TaskImpact from './components/Task/TaskImpact';

//Profiles
import StudentProfiles from './components/Profiles/StudentProfiles';
import ProfessionalProfiles from './components/Profiles/ProfessionalProfiles';
import ProfileView from './components/Profiles/ProfileView';

import Navbar from './components/Navbar/Navbar';
import { SubdomainProvider } from './components/SubdomainContext';
import { TechProvider } from './components/TechContext';

function App() {
  return (
    <div className="App">
      <SubdomainProvider>
      <TechProvider>
        <BrowserRouter>
          <LocationWrapper>
            <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userverification" element={<UserVerfifcation />} />
        <Route path="/usersignup" element={<UserSignup/>} />
        

        <Route path="/home" element={<Home/>} />


        <Route path="/account" element={<Account/>} />
        <Route path="/profileform" element={<ProfileForm/>} />


        <Route path="/messagessend" element={<MessagesSend/>} />
        <Route path="/messagesrecive" element={<MessagesRecive/>} />


        <Route path="/updates" element={<Update/>} />
        {/* <Route path="/updateview" element={<UpdateView/>}/> */}
        <Route path="/updateview/:id" exact element={<UpdateView />} />
        <Route path="/myupdates" element={<MyUpdate/>}/>


        <Route path="/tasks" element={<Task/>} />
        {/* <Route path="/taskview" element={<TaskView/>} /> */}
        <Route path="/taskview/:id" exact element={<TaskView />} />
        <Route path="/mytasks" element={<MyTask/>} />
        <Route path="/taskimpact" element={<TaskImpact/>} />


        <Route path="/studentprofiles" element={<StudentProfiles/>} />
        <Route path="/professionalprofiles" element={<ProfessionalProfiles/>} />
        <Route path="/profileview/:id" exact element={<ProfileView />} />

        
        

 


        </Routes>
          </LocationWrapper>
        </BrowserRouter>
        </TechProvider>
      </SubdomainProvider>

      </div>
  );
}


function LocationWrapper({ children }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/usersignup' && location.pathname !== '/userverification' && <Navbar />}
      {children}
    </>
  );
}

export default App;
