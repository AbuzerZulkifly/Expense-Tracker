import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPath.js'
import AdminList from '../../components/admin/AdminList.jsx'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useUserAuth } from '../../hooks/useUserAuth.hook.jsx'
const Admin = () => {

  const navigate = useNavigate();
  const {user} = useUserAuth();
  if(!user || !user.isAdmin){
    navigate("/home");
  }

  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [openUpdateAlert, setOpenUpdateAlert] = useState({
      show: false,
      data: null,
    });
  
  const fetchUsers = async ()=> {
    setLoading(true);
    try{
      const response = await (axiosInstance.get(API_PATHS.ADMIN.GET_USERS))
      if(response.data){
        setUserData(response.data)
      }
    }
    catch(error)
    {
    console.log("Error fetching user data:", error);        
    } finally {
        setLoading(false);
    }
  }

  const updateUserStatus = async (userId) => {
    try {
      await axiosInstance.patch(`${API_PATHS.ADMIN.UPDATE_USER_STATUS(userId)}`);
      setOpenUpdateAlert({
        show: false,
        data: null,
      });
      toast.success("User Status Updated successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status expense:", error);
      toast.error("Failed to Update user status. Please try again.");
    }
  }
  useEffect(() => {
    fetchUsers();
    return () => {}
  }, []);
  return (
    <DashboardLayout activeMenu="Admin">
      <AdminList 
        users={userData}
        onUpdate={updateUserStatus}
      />
    </DashboardLayout>
  )
}

export default Admin