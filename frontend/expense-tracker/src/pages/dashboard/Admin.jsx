import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPath.js'
import AdminList from '../../components/admin/AdminList.jsx'
const Admin = () => {

  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  
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
  useEffect(() => {
    fetchUsers();
    return () => {}
  }, []);
  return (
    <DashboardLayout activeMenu="Admin">
      <AdminList 
        fetchUsers={userData}
      />
    </DashboardLayout>
  )
}

export default Admin