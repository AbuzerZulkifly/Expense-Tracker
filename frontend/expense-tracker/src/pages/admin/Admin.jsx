// import React from 'react'
// import { useUserAuth } from '../../hooks/useUserAuth.hook.jsx'
// import { IoMdCard } from 'react-icons/io'
// import InfoCard from '../../components/cards/InfoCard.jsx' 
// import { useNavigate } from 'react-router-dom'
// import axiosInstance from '../../utils/axiosInstance.js'
// import { API_PATHS } from '../../utils/apiPath.js'

// const Admin = () => {

//     useUserAuth();

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchUserData = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const response = await axiosInstance.get(`${API_PATHS.AUTH.GET_USER}`);
//       if(response.data){
//         setUserData(response.data);
//       }
//      } catch (error) {
//         console.error("Error fetching User data:", error);
//       } 
//       finally {
//         setLoading(false);
//       }
// ;
    
//   };
//   useEffect(() => {
//     // ✅ Try to load from localStorage first
//     const storedData = localStorage.getItem("userData");
//     if (storedData) {
//       setUserData(JSON.parse(storedData));
//     } else {
//       fetchUserData(); // Fetch fresh if nothing in storage
//     }
//   }, []);

//   return (
//           <div className="my-5 mx-auto">
//         <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 ">
//           <InfoCard 
//             icon={<IoMdCard />}
//             label="Total Users"
//             value={}
//             color = "bg-violet-600"
//           />
//           <InfoCard 
//             icon={<LuWalletMinimal />}
//             label="Total Income"
//             value={}
//             color = "bg-green-600"
//           />
//           <InfoCard 
//             icon={<LuHandCoins />}
//             label="Total Expense"
//             value={}
//             color = "bg-red-600"
//           />
//         </div>
//         </div>
//   )
// }

// export default Admin