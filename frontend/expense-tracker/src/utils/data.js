import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
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
    id: "03",
    title: "Logout",
    icon: LuLogOut,
    path: "logout",
  }
]