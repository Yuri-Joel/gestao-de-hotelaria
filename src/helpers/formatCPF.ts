
export  const formatCpf = (inputString: string) => {
    const cleaned = inputString.replace(/\D/g, '') // Remove todos os caracteres não numéricos

    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    return cleaned // Retorna apenas os números limpos se nenhuma correspondência for encontrada
  
}