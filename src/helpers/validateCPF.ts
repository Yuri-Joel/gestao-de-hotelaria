export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, '')

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) return false

  // Elimina CPFs com todos os dígitos iguais (00000000000, 11111111111, etc.)
  if (/^(\d)\1+$/.test(cpf)) return false

  // Valida o primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  const primeiroDigitoVerificador = resto === 10 || resto === 11 ? 0 : resto

  if (primeiroDigitoVerificador !== parseInt(cpf.charAt(9))) {
    return false
  }

  // Valida o segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  const segundoDigitoVerificador = resto === 10 || resto === 11 ? 0 : resto

  if (segundoDigitoVerificador !== parseInt(cpf.charAt(10))) {
    return false
  }

  // CPF é válido
  return true
}
