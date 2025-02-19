import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
const MessagesSend = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/api/notification/send-notification', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();

        setNotifications(data);


      } catch (error) {
        console.error('Error fetching notifications:', error);

      }
    };

    fetchData();

  }, []);

  return (
    <>

   <div className="container mx-auto px-8 py-8 pb-2 mt-10">
     <div className="flex justify-center md:justify-end md:mr-32 ">
       <Link
         to="/messagesrecive"
         className="font-medium text-[#005A9C] hover:underline dark:text-[#005A9C] px-4 py-2"
       >
        Recive
       </Link>
     </div>
   </div>
   
   

      <div className="container mx-auto px-4 my-8 flex flex-col items-center justify-center">

        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div className="w-full max-w-2xl space-y-4 mb-5">


              <div id="toast-message-cta" className="w-full p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert" key={notification._id}>
                <div className="flex">
                  <img className="w-10 h-10 rounded-full" src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" alt="User" />
                  <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{notification.recivername}</span>
                    <div className="mb-2 text-sm font-normal">{notification.msg}</div>

                  </div>
                </div>
              </div>




            </div>

          ))
        ) : (
          <p>Notification not found</p>
        )}


      </div>
    </>
  );
}

export default MessagesSend;
