import React, {useState} from 'react'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi'
import SideMenu from './SideMenu.jsx'

const Navbar = ({activeMenu}) => {
  
  const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
   <div className='flex gap-3  py-4 px-7 sticky top-0 bg-white z-3 '>
    <button
     className='block lg:hidden text-black'
     onClick={() => {setOpenSideMenu(!openSideMenu)}}      
    >
      {openSideMenu ? (<HiOutlineX className='text-2xl' />) : (<HiOutlineMenu className='text-2xl' />)}
    </button>

      <h2 className='text-2xl text-primary font-medium text-black'>Finance Manager</h2>
      
      {openSideMenu && (
        <div className='fixed top-[61px] -ml-4 bg-white'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
   </div> 
  )
}

export default Navbar