import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import IncomeOverview from '../../components/income/IncomeOverview.jsx'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPath.js'
import Modal from '../../components/Modal.jsx'

const Income = () => {

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get income data from API
  const fetchIncomeData = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_INCOME}`);
      
      if(response.data){
        setIncomeData(response.data);
      }
      
    } catch (error) {
        console.log("Error fetching income data:", error);        
    } finally {
        setLoading(false);
    }
  }

  // Adding new Income
  const handleAddIncome = async (income) => {}

  // Delete income
  const handleDeleteIncome = async (incomeId) => {}

  // Download Income Excel 
  const handleDownloadIncomeExcel = async () => {}

  useEffect(() => {
    fetchIncomeData();
    return () => {}
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={()=> setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal 
          isOpen={openAddIncomeModal} 
          onClose={() => setOpenAddIncomeModal(false)} 
          title="Add New Income"
        >
          <div className="">

          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income