const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  }
  
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${padTo2Digits(date.getUTCMonth() + 1)}-${padTo2Digits(date.getUTCDate())}`      
  }

  export default formatDate