import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
 
    <div className='flex  gap-6 items-center p-6 md:p-3 rounded-2xl border-gray-500 bg-gray-200'>
      <div className={`w-14 h-14 flex items-center justify-center text-2xl text-white ${color} rounded-full`}>
        {icon}
      </div>
    <div>
      <h6 className='mt-2 text-2xl md:text-lg font-semibold'>{label}</h6>
      <span className='text-base font-semibold'>LKR {value}</span>
    </div>
    </div>

  )
  
}

export default InfoCard