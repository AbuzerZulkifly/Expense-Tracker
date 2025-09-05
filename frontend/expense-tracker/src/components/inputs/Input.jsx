import React, {useState} from 'react'
import {FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Input = ({value, onChange, placeholder, label, type}) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  return (
    <div>
      <label className="block md:text-lg text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className='input-box'>
      <input 
      /*If the type prop is "password":
If showPassword is true, the input type becomes "text" (so the password is visible).
If showPassword is false, the input type remains "password" (so the password is hidden).
If the type prop is not "password", it just uses the value of type.*/
      type={type == "password" ? showPassword ? 'text' : 'password' : type} 
      placeholder={placeholder}
      className="w-full bg-transparent outline-none"
      value={value}
      onChange={(e) => onChange(e)}
      />
      {type === "password" && ( <>
        {showPassword ? (
          <FaRegEye
            size = {22}
            className = "text-violet-500"
            onClick = {()=> togglePasswordVisibility()}
            />
        ) : (
        <FaRegEyeSlash 
          size={22}
          className='text-slate-500 cursor-pointer'
          onClick = {() => togglePasswordVisibility()}
          />
        )
      }
      </>
    )
    }
      </div>
    </div>

  )
}

export default Input