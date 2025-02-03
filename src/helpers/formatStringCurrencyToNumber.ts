export function formatStringCurrencyToNumber(valor: string): number {
  // Remove "R$", espaços, pontos e converte a vírgula em ponto
  const cleanNumber = valor
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')

  // Converte a string limpa em um número
  const numberFormatted = parseFloat(cleanNumber)

  // Retorna o número convertido
  return numberFormatted
}
