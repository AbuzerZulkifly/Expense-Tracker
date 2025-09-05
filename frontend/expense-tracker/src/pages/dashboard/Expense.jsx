import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import ExpenseOverview from '../../components/expense/ExpenseOverview.jsx'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPath.js'
import Modal from '../../components/layouts/Modal.jsx'
import AddExpenseForm from '../../components/expense/AddExpenseForm.jsx'
import { toast } from 'react-hot-toast'
import ExpenseList from '../../components/expense/expenseList.jsx'
import DeleteAlert from "../../components/DeleteAlert.jsx";
import { useUserAuth } from '../../hooks/useUserAuth.hook.jsx'

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get expense data from API
  const fetchExpenseData = async () => {
    
    setLoading(true);
    
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_EXPENSE}`);
      
      if(response.data){
        setExpenseData(response.data);
      }
      
    } catch (error) {
        console.log("Error fetching expense data:", error);        
    } finally {
        setLoading(false);
    }
  }

  // Adding new expense
  const handleAddExpense = async (expense) => {
    const {icon, date, category, description, amount} = expense;
    if( !category || !amount) {
      toast.error("Category and Amount are required");
      return;
    }
    if(category.length < 4){
      toast.error("Please Enter a meaningful category");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`, 
        {icon, date, category, description, amount});
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
      fetchExpenseData();
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    }
  }


  // Delete expense
  const handleDeleteExpense = async (expenseId) => {
    if(!expenseId){
      toast.error("Invalid expense ID");
      return;
    }

    try {
      await axiosInstance.delete(`${API_PATHS.EXPENSE.DELETE_EXPENSE(expenseId)}`);
      setOpenDeleteAlert({
        show: false,
        data: null,
      });
      toast.success("Expense deleted successfully");
      fetchExpenseData();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please try again.");
    }
  }

  // Download expense Excel 
  const handleDownloadExpenseExcel = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense Excel:", error);
      toast.error("Failed to download expense Excel. Please try again.");
    }
  }

  useEffect(() => {
    fetchExpenseData();
    return () => {}
  }, []);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const filteredExpenses = expenseData.filter(exp => {
  const expDate = new Date(exp.date);
  const start = filterStartDate ? new Date(filterStartDate) : null;
  const end = filterEndDate ? new Date(filterEndDate) : null;
  if (start && expDate < start) return false;
  if (end && expDate > end) return false;
  return true;
});
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList 
            transactions={filteredExpenses}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}  
            onDownload={handleDownloadExpenseExcel}
                        filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onStartDateChange={setFilterStartDate}
            onEndDateChange={setFilterEndDate}
          />

        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add New expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=> setOpenDeleteAlert({
            show: false,
            data: null,
          })}
          title="Delete Expense"
        >
          <DeleteAlert 
            content="Are you Sure You Want To Delete This Expense Field"
            onDelete={()=> handleDeleteExpense(openDeleteAlert.data)}
          />

        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expense