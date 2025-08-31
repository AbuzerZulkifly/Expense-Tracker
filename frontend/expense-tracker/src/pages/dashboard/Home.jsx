import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import { useUserAuth } from '../../hooks/useUserAuth.hook.jsx'
import { IoMdCard } from 'react-icons/io'
import InfoCard from '../../components/cards/InfoCard.jsx'
import {LuHandCoins, LuWalletMinimal} from 'react-icons/lu'
import { addNumberSeperator } from '../../utils/helper.js' 
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPath.js'
import RecentTransaction from '../../components/dashboard/RecentTransaction.jsx'
import FinanceOverview from '../../components/dashboard/FinanceOverview.jsx'
import ExpenseTransaction from '../../components/dashboard/ExpenseTransaction.jsx'
import Last30DaysExpenses from '../../components/dashboard/Last30DaysExpenses.jsx'
import RecentIncomeWithChart from '../../components/dashboard/RecentIncomeWithChart.jsx'
import IncomeTransaction from '../../components/dashboard/IncomeTransaction.jsx'


export const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if(response.data){
        setDashboardData(response.data);
      }
     } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } 
      finally {
        setLoading(false);
      }
;
    
  };
  useEffect(() => {
    // ✅ Try to load from localStorage first
    const storedData = localStorage.getItem("dashboardData");
    if (storedData) {
      setDashboardData(JSON.parse(storedData));
    } else {
      fetchDashboardData(); // Fetch fresh if nothing in storage
    }
  }, []);

  return (
    <DashboardLayout activeMenu="Home">
      <div className="my-5 mx-auto">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 ">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addNumberSeperator(dashboardData?.totalBalance || 0)}
            color="bg-violet-600"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addNumberSeperator(dashboardData?.totalIncome || 0)}
            color="bg-green-600"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addNumberSeperator(dashboardData?.totalExpense || 0)}
            color="bg-red-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-2 sm:text-[0.7rem] md:gap-2 mt-6">
          <RecentTransaction
            transactions={dashboardData?.lastTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransaction
            transactions={dashboardData?.last30DaysExpense?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpense?.transactions || []}
          />

          <IncomeTransaction 
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
          
          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
         />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home