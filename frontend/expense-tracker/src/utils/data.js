import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
  LuUser
} from 'react-icons/lu';

export const SIDE_MENU_DATA = [
  {
    id: "01",
    title: "Home",
    icon: LuLayoutDashboard,
    path: "/home",    
  },
  {
    id: "02",
    title: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    title: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  

  {
    id: "04",
    title: "Logout",
    icon: LuLogOut,
    path: "logout",
  }
]
export const ADMIN_SIDE_MENU_DATA = [
  {
    id: "01",
    title: "Home",
    icon: LuLayoutDashboard,
    path: "/home",    
  },
  
  {
    id: "02",
    title: "Admin",
    icon: LuUser,
    path: "/admin",
  },
  {
    id: "03",
    title: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "04",
    title: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  

  {
    id: "05",
    title: "Logout",
    icon: LuLogOut,
    path: "logout",
  }
]