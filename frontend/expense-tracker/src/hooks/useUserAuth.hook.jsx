import { useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPath.js";
import { UserContext } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";


export const useUserAuth = () => {
  const {user, updateUser, clearUser} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(user) return

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER) 
        if (isMounted && response.data) {          
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        
        if (isMounted) {
          clearUser();
          navigate('/login');
        }
      }
    };

    
    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);

}