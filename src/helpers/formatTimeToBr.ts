export const formatTimeToBR = (date: Date): string => {
  if (!(date instanceof Date)) {
    throw new Error('O valor fornecido não é uma instância válida de Date.')
  }

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}
