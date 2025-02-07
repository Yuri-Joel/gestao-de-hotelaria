const URL = process.env.NEXT_PUBLIC_API_WHATSAPP;
const PHONE = process.env.NEXT_PUBLIC_API_WHATSAPP_NUMBER;

const whatsAppApi = () => {
  let url = `${URL}/${PHONE}`;
  return window.open(url);
}

export default whatsAppApi;