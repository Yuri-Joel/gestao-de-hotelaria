import { removeNonNumerics } from './removeNonNumerics'

/**
 * Formata um cnpj no formato XXXXX-XXX.
 * @param cep - O cnpj a ser formatado.
 * @returns O cnpj formatado.
 */
export function formatCNPJ(param: string): string {
  const cnpj = removeNonNumerics(param)

  if (cnpj.length !== 14) {
    throw new Error('CNPJ inválido')
  }

  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}
