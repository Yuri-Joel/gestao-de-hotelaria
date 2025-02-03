import { removeNonNumerics } from './removeNonNumerics'

/**
 * Formata um CEP no formato XXXXX-XXX.
 * @param cep - O CEP a ser formatado.
 * @returns O CEP formatado.
 */
export function formatCEP(cep: string): string {
  const cleaned = removeNonNumerics(cep)

  if (cleaned.length < 7 && cleaned.length > 8) {
    throw new Error('CEP inválido')
  }

  if (cleaned.length === 7) {
    return cleaned.replace(/(\d{5})(\d{2})/, '$1-$2')
  }

  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
}
