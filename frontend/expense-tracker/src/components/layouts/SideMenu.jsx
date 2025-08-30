import React, { useContext } from 'react'
import { ADMIN_SIDE_MENU_DATA, SIDE_MENU_DATA } from '../../utils/data.js';
import { UserContext } from '../../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../cards/CharAvatar.jsx';

const SideMenu = ({activeMenu}) => {
  const {user, clearUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleClick = (route) => {
    if (route === 'logout') {
     handleLogout();
     return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    if(confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      clearUser();
      navigate('/login');
  }
}
  return <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-400/50 p-5 sticky top-[61px] z-2'>
    
    <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
      {user?.profilePic ? (
        <img src={user?.profilePic || ""} 
             alt="Profile Image"
             className='w-20 h-20 rounded-full bg-slate-400'/>) : 
             <CharAvatar  
             fullName = {user?.fullName}
             width = "w-20"
             height = "h-20"
             style = "text-xl" />}
        <h5 className='text-xl font-semibold text-primary'>
          {user?.fullName || ""}
        </h5>
    </div>
    {user?.isAdmin  ? (
    ADMIN_SIDE_MENU_DATA.map((item, index) => (
      <button
      key={`menu_${index}`}
      className={`w-full flex items-center gap-3 text-[1rem]}
        ${activeMenu == item.title ? "text-white bg-violet-600": ""} py-3 px-6 rounded-lg mb-3`}
        onClick={() => handleClick(item.path)}
      >
        <item.icon className='text-3xl' />
         {item.title}
      </button>
    )))
    :
    (SIDE_MENU_DATA.map((item, index) => (
      <button
      key={`menu_${index}`}
      className={`w-full flex items-center gap-3 text-[1rem]
        ${activeMenu == item.title ? "text-white bg-violet-600": ""} py-3 px-6 rounded-lg mb-3`}
        onClick={() => handleClick(item.path)}
      >
        <item.icon className='text-3xl' />
         {item.title}
      </button>
    ))  )
  }
  </div>
  
}


export default SideMenu