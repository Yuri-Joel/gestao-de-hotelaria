export function formatPercentage(value: number) {
  return `% ${value.toFixed(2).replace('.', ',')}`
}
export function formatPercentageInNumber(formattedValue: string): number {
  // Remove o símbolo de porcentagem e espaços extras
  const cleanedValue = formattedValue?.replace('%', '').trim();

  // Substitui a vírgula por ponto e converte para número
  return parseFloat(cleanedValue?.replace(',', '.'));
}