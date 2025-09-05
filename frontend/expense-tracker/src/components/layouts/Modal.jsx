import React from 'react'
import { LuX  } from 'react-icons/lu';

const Modal = ({ children, isOpen, onClose, title }) => {
  if(!isOpen) return null
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-5 flex justify-center items-center w-full 
        h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/50 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative  bg-white rounded-lg shadow">
          <div className='flex justify-between'>
          <div></div>
          <h3 className="text-center font-semibold text-xl py-1.5">{title}</h3>

          <button
            className="text-xl text-gray-500 rounded-xl px-2.5 hover:bg-gray-300 "
            type="button"
            onClick={onClose}
          >
            <LuX />
          </button>
          </div>
          <div className='p-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal