// Formata o CEP
export function removeNonNumerics(param: string): string {
  return param?.replace(/\D/g, '')
}
