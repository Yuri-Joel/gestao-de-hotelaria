
export const formatDateIsoToBr = (isoString: Date) => {
    // Verifica se a string está no formato ISO
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0'); // Formata o dia com 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Formata o mês com 2 dígitos (começa do zero, por isso +1)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Retorna no formato dd-mm-aaaa
  };