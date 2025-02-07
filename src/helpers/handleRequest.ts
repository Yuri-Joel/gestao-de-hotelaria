import handleErrors from './handleErrors '
import Cookies from 'js-cookie'

type TRequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
interface IUseRequest extends RequestInit {
  url: string
  method: TRequestMethods
  apiBrasil?: boolean
}

export type IResponse<T> = {
  error: { value: boolean; msg: string }
  status: number | null
  data: T | null
}

const baseURL = process.env.NEXT_PUBLIC_API_PMS as string
const apiBrasilURl = process.env.NEXT_PUBLIC_API_BRASIL as string

async function handleRequest<T>({
  url,
  method,
  apiBrasil,
  ...props
}: IUseRequest): Promise<IResponse<T>> {
  // Verifica conexão com a internet
  if (!navigator.onLine) {
    console.error(
      'Sem resposta do servidor. Verifique sua conexão de internet.',
    )
    return {
      error: {
        value: true,
        msg: 'Sem resposta do servidor. Verifique sua conexão de internet.',
      },
      status: null,
      data: null,
    }
  }

  try {
    // Define a URL base com ou sem apiBrasil
    const instance = !apiBrasil ? `${baseURL}${url}` : `${apiBrasilURl}${url}`

    // Busca o token de autenticação, se necessário
    const token = Cookies.get(
      process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string,
    )

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...props.headers, // Sobrescreve headers personalizados, se presentes
    }

    // Faz a requisição
    const response = await fetch(instance, {
      ...props,
      method,
      headers,
    })

    // Lida com respostas não OK
    if (!response.ok) {
      const error = await response.json()
      return handleErrors(response, error) // Função para tratar erros personalizados
    }

    // Resposta bem-sucedida
    const res = await response.json()
    return {
      error: { value: false, msg: '' },
      status: response.status,
      data: res.data as T,
    }
  } catch (error: any) {
    console.log('Erro global: ', error)
    return {
      error: {
        value: true,
        msg: 'Sem resposta do servidor. Verifique sua conexão de internet.',
      },
      status: null,
      data: null,
    }
  }
}

export default handleRequest
