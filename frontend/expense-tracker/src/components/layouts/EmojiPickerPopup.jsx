import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react";
import {LuImage, LuX, } from 'react-icons/lu'


const EmojiPickerPopup = ({icon, onSelect}) => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mb-10">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl  text-primary rounded-full">
          {icon ? <img src={icon} alt="Icon" className="w-12 h-12" /> : <LuImage />}
        
        </div>
          { icon ? <button className='relative -top-6 -left-6 text-red-500' onClick={(emoji) => onSelect(emoji? "" : "")}><LuX className='text-xl' /></button> : ""}
        <p className="relative -bottom-6 -left-18">{icon ? "" : "Pick Icon"}</p>
      </div>
      {isOpen && (
        <div className="relative">
          <button className="w-7 h-7 flex items-center justify-center bg-transparent  border-gray-200 rounder-full absolute -top-1 -right-1 z-1 cursor-pointer" onClick={() => setIsOpen(false)}>
            <LuX />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPickerPopup