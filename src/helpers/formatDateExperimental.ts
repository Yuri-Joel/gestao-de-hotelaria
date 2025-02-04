

//está função de data ainda é experimental by: Yuridevelop
    export const formatDateShort = (date: Date): string => {
        const d = new Date(date);
        const day = d.getDate();
        // Obtém o mês abreviado em português (por exemplo, "fev." ou "fev")
        let month = d.toLocaleString("pt-BR", { month: "short" });
        // Remove o ponto final, caso exista
        month = month.replace('.', '');
        return `${day} de ${month}`;
      };
      