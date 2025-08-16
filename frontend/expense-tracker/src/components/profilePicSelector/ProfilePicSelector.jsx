import React, {useState, useRef} from 'react'
import {LuUser, LuUpload, LuTrash} from "react-icons/lu"
const ProfilePicSelector = ({image, setImage}) => {
  
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      //update the img state 
      setImage(file)

      //Generate preview url from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview)
    }
  }

  const handleRemoveImg = () => {
    setImage(null)
    setPreviewUrl(null)
  };

  const onChooseFile = () => {
    inputRef.current.click()
  }
  return (
    <div className='flex flex-col items-center justify-center w-20 h-20 gap-4 bg-violet-300 relative rounded-full'>
      <input 
      type="file"
      accept='image/*'
      ref={inputRef}
      onChange={handleImageChange}
      className='hidden'

      />
      {!image ? (
        <div>
          <LuUser className='text-white text-3xl' />
          <button
          type='button'
          className='bg-violet-600 w-7 h-7 flex justify-center items-center text-white rounded-full absolute -bottom-0.1 -right-1'
          onClick={onChooseFile}
          >
            <LuUpload/>
          </button>
        </div>
      ) :
      (
        <div className='relative'>
          <img src={previewUrl} 
          alt="profile Photo"
          className='w-20 h-20 rounded-full object-cover'
          />
          <button
          type='button'
          className='w-8 h-8 flex justify-center items-center text-white bg-red-500 rounded-full absolute -bottom-1 -right-1'
          onClick={handleRemoveImg}
          >
            <LuTrash />
          </button>
        </div>
      )
    
    }
    </div>
  )
}

export default ProfilePicSelector