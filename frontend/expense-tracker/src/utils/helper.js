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