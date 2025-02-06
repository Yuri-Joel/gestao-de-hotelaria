import Cookies from 'js-cookie'

const auth_cookie_name = process.env.NEXT_PUBLIC_USERDATA_COOKIE_NAME as string
const auth_cookie_name_T = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string


export const setAuthCookie = (token: string) => {
  Cookies.set(auth_cookie_name, token, {
    expires: 1,
    sameSite: 'None',
    secure: true,
  })
}

export const getAuthCookie = () => {
  const cookie = Cookies.get(auth_cookie_name)
  return cookie
}

export const removeAuthCookie = () => {
  Cookies.remove(auth_cookie_name);
  Cookies.remove(auth_cookie_name_T)

  return
}

export const parseCookie = () => {
  const cookie = getAuthCookie()
  const cookieParsed = cookie && JSON.parse(cookie as string)

  return cookieParsed
}
