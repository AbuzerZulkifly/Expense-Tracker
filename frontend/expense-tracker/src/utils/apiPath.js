export const BASE_URL = 'http://localhost:8000';

//utils apiPaths,js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER: "/api/v1/auth/getUser",
  },
  ADMIN: {
    GET_USERS: "/api/v1/admin/users/",
    DELETE_USER: (userId) => `/api/v1/admin/users/${userId}`,
    UPDATE_USER_STATUS: (userId) => `/api/v1/admin/users/${userId}/status`
  },
  DASHBOARD: {
   GET_DATA: "/api/v1/home"
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/addIncome",
    GET_INCOME: "/api/v1/income/getIncome", 
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: "/api/v1/income/downloadIncomeExcel",
  },
  EXPENSE: {
    GET_EXPENSE: "/api/v1/expense/getExpense",
    ADD_EXPENSE: "/api/v1/expense/addExpense",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/income/downloadExpenseExcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  }
}