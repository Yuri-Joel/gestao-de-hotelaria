export const formatDateDetailsReserve = (date: Date) => {
  
  const formatteDate =  date.toLocaleDateString("pt-Br", {
    day:"2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })

  const finalDate = formatteDate
    .replace(/\./g, '') // Remove o ponto após o mês
  
  return finalDate;
}