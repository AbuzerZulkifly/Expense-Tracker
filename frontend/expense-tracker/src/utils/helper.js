import moment from "moment";

export const validateEmail = (email) => { 
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const getInitials = (fullName) => {
  if (!fullName) return "";
  const names = fullName.split(" ");
  const initials = names.map(name => name.charAt(0).toUpperCase()).join("");
  return initials;
}

export const addNumberSeperator = (number) => {
  if(number == null || isNaN(number)) return

  const [integerPart, fractionalPart] = number.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    month: moment(item?.date).format("Do MMM YYYY"),
    Amount: item?.amount

  }));
  console.log("Expense Chart Data:", chartData);
  return chartData
}
export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM YYYY"),
    category: item?.source,
    Amount: item?.amount
  }));
  return chartData
}

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData =[...data].sort((a,b) => new Date(a.date) - new Date(b.date));
    const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM YYYY"),
    category: item?.category,
    Amount: item?.amount
  }));
  return chartData
}

export const prepareIncomeLineChartData = (data = []) => {
  const sortedData =[...data].sort((a,b) => new Date(a.date) - new Date(b.date));
    const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM YYYY"),
    source: item?.source,
    Amount: item?.amount
  }));
  return chartData
}