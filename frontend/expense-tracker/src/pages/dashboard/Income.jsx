import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import IncomeOverview from '../../components/income/IncomeOverview.jsx'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPath.js'
import Modal from '../../components/layouts/Modal.jsx'
import AddIncomeForm from '../../components/income/AddIncomeForm.jsx'
import { toast } from 'react-hot-toast'
import IncomeList from '../../components/income/IncomeList.jsx'
import DeleteAlert from "../../components/DeleteAlert.jsx";
import { useUserAuth } from '../../hooks/useUserAuth.hook.jsx'

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get income data from API
  const fetchIncomeData = async () => {
    
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
  const handleAddIncome = async (income) => {
    const {icon, date, source, description, amount} = income;
    if( !source || !amount) {
      toast.error("Category and Amount are required");
      return;
    }
    if(source.length < 4){
      toast.error("Please Enter a meaningful source");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, 
        {icon, date, source, description, amount});
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
      fetchIncomeData();
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income. Please try again.");
    }
  }


  // Delete income
  const handleDeleteIncome = async (incomeId) => {
    if(!incomeId){
      toast.error("Invalid income ID");
      return;
    }

    try {
      await axiosInstance.delete(`${API_PATHS.INCOME.DELETE_INCOME(incomeId)}`);
      setOpenDeleteAlert({
        show: false,
        data: null,
      });
      toast.success("Income deleted successfully");
      fetchIncomeData();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income. Please try again.");
    }
  }

  // Download Income Excel 
  const handleDownloadIncomeExcel = async () => {
        try {
          const response = await axiosInstance.get(
            API_PATHS.INCOME.DOWNLOAD_INCOME,
            {
              responseType: "blob",
            }
          );
    
          // Create a URL for the blob
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Income_details.xlsx');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error downloading income Excel:", error);
          toast.error("Failed to download income Excel. Please try again.");
        }
  }

  useEffect(() => {
    fetchIncomeData();
    return () => {}
  }, []);

  const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const filteredIncome = incomeData.filter(inc => {
    const expDate = new Date(inc.date);
    const start = filterStartDate ? new Date(filterStartDate) : null;
    const end = filterEndDate ? new Date(filterEndDate) : null;
    if (start && expDate < start) return false;
    if (end && expDate > end) return false;
    return true;
  });
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList 
            transactions={filteredIncome}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}  
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onStartDateChange={setFilterStartDate}
            onEndDateChange={setFilterEndDate}
            onDownload={handleDownloadIncomeExcel}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=> setOpenDeleteAlert({
            show: false,
            data: null,
          })}
          title="Delete Income"
        >
          <DeleteAlert 
            content="Are you Sure You Want To Delete This Income Field"
            onDelete={()=> handleDeleteIncome(openDeleteAlert.data)}
          />

        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income