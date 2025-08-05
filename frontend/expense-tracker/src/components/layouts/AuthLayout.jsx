import React from 'react';
import DashboardCard from '../../assets/images/dashboard-card.png';
import {LuTrendingUpDown} from "react-icons/lu"

const AuthLayout = ({children}) => {
  return (
  <div className='flex ps-[5%]'>
    
    <div className='w-screen h-screen pt-2'>
      <h1 className='font-extrabold text-4xl'>COCO FINANCE</h1>
      {children}
    </div>

    <div className='hidden md:block w-[40vw] h-screen bg-violet-200 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
      <div className='w-48 h-48 rounded-[40px] bg-purple-700 absolute -top-7 -left-5' />
      <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10' />
      <div className='w-48 h-56 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5' />

    <div className='grid grid-cols-1 z-20'>
      <StatsInfoCard 
        icon = {<LuTrendingUpDown />}
        label = "Track your Finances"
        value = "50000"
        color = "bg-violet-500"
      />

    </div>
      <img src={DashboardCard}
        className='w-64 lg:w-[88%] rounded-xl absolute bottom-10 shadown-lg shadow-blue-400/15' />
    </div>

  </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({icon, label, value, color}) => {
  return (
    <div className='flex gap-6 items-center bg-gray-400  p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10'>
      <div className={`w-15 h-15 flex items-center justify-center text-[26px] ${color} rounded-full text-shadow-xl`}>
        {icon}
      </div>

      <div className="text-[20px] font-bold">
        <h6>{label}</h6>
        <span>{value}</span>
      </div>

    </div>
  )
}