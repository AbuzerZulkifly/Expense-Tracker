import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import Input from '../../components/inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'
import ProfilePicSelector from '../../components/profilePicSelector/ProfilePicSelector.jsx'

export const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();

    if(!name) {
      setError("Please Enter Your Name")
      return
    }

    if(!validateEmail(email)) {
      setError("Please Enter a Valid Email")
      return
    }

    if(!password) {
      setError("Please Enter the Password")
      return
    }

    setError("")
    // Signup API Call
  }
  return (
    <div className='flex flex-col gap-2 justify-center items-center h-screen'>
      <form className='w-[40%] text-center border-2 border-gray-400 p-2 rounded-2xl' onSubmit={handleSignup}>
          <div className=' flex flex-col items-center gap-2 mb-2'>
            <h1 className='text-2xl text-center text-primary'>Create an Account</h1>
            <p className='text-sm text-gray-500'>Please fill in the details below to create your account.</p>
            <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
          </div>
          <Input 
            value={name}
            onChange={({target}) => setName(target.value)}
            label="Enter Your Full Name"
            placeholder="John Document"
            type="text"
          />
          <Input 
            value = {email}
            onChange = {({target}) => setEmail(target.value)}
            label = "Email"
            placeholder = "johndoe@gmail.com"
            type = "email"
          />
          
          <Input 
            value = {password}
            onChange = {({target}) => setPassword(target.value)}
            label = "Password"
            placeholder = "Minimum 8 Characters"
            type = "password"
          />
             {error && <p className='text-red-500 tex-xs pb-2.5'>{error}</p>}        
              <button type="submit" className='btn-primary w-full'>Sign Up</button>
              <p className=''>Already Have an Account? {""}
                <Link className="font-medium text-primary" to="/login">
                   Login
                </Link>
              </p>
           
      </form>
    </div>
  )
}
export default Signup