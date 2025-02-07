import { FloorListEntity } from "@/interfaces/FloorListEntity"

export const fakeGuest: Reservers[] = [
  { id: 11111112, name: "CAROLINE DA SILVA", phone:"55 35 5432-3985",checkIn: new Date("2025-02-01"), checkOut: new Date("2025-02-03"),externReference: 2222222222, createAt: new Date("2025-02-05"), room: 101, payment: 1500 },
  { id: 11111113, name: "JOÃO PEREIRA", phone:"",checkIn: new Date("2025-02-04"), checkOut: new Date("2025-02-06"), externReference: 2222222222, createAt: new Date("2025-02-04"), room: 102, payment: 1500 },
  { id: 11111222, name: "MARIA OLIVEIRA", phone:"55 35 5432-3985",checkIn: new Date("2025-02-02"), checkOut: new Date("2025-02-05"), externReference: 2222222222, createAt: new Date("2025-02-05"), room: 103, payment: 1500 },
  { id: 11113331, name: "PEDRO SANTOS", phone:"",checkIn: new Date("2025-02-05"), checkOut: new Date("2025-02-07"), externReference: 2222222222, createAt: new Date("2025-02-04"), room: 201, payment: 1500 },
  { id: 11111323, name: "ANA LIMA", phone:"55 35 5432-3985",checkIn: new Date("2025-02-03"), checkOut: new Date("2025-02-06"), externReference: 2222222222, createAt: new Date("2025-02-01"), room: 301, payment: 1500 },
  { id: 11111131, name: "FERNANDO COSTA", phone:"55 35 5432-3985",checkIn: new Date("2025-02-07"), checkOut: new Date("2025-02-10"),externReference: 2222222222, createAt: new Date("2025-02-05"), room: 401, payment: 1500 },
  { id: 11111313, name: "Yuri Gomes", phone:"55 35 5432-3985",checkIn: new Date("2025-02-07"), checkOut: new Date("2025-02-10"), externReference: 2222222222, createAt: new Date("2025-02-03"), room: 105, payment: 1500 },
  { id: 11113442, name: "Jumper", phone:"55 35 5432-3985",checkIn: new Date("2025-02-07"), checkOut: new Date("2025-02-10"), externReference: 2222222222, createAt: new Date("2025-02-02"), room: 202, payment: 1500 },
  { id: 11165353, name: "Abraão Daniel", phone:"",checkIn: new Date("2025-02-04"), checkOut: new Date("2025-02-08"), externReference: 2222222222, createAt: new Date("2025-02-05"), room: 302, payment: 1500 },
  { id: 11135365, name: "ROSA MOURA", phone:"",checkIn: new Date("2025-02-06"), checkOut: new Date("2025-02-09"), externReference: 2222222222, createAt: new Date("2025-02-04"), room: 402, payment: 1500 },
  { id: 11112453, name: "BRUNA ALMEIDA", phone:"",checkIn: new Date("2025-02-03"), checkOut: new Date("2025-02-07"), externReference: 2222222222, createAt: new Date("2025-02-05"), room: 404, payment: 1500 },
  { id: 12535453, name: "CARLOS EDUARDO", phone:"",checkIn: new Date("2025-02-08"), checkOut: new Date("2025-02-11"), externReference: 2222222222, createAt: new Date("2025-02-02"), room: 305, payment: 1500 },
  { id: 11152352, name: "Aderito EDUARDO", phone:"",checkIn: new Date("2025-02-08"), checkOut: new Date("2025-02-11"), externReference: 2222222222, createAt: new Date("2025-02-01"), room: 305, payment: 1500 },
  { id: 11115452, name: "José João", phone:"55 35 5432-3985",checkIn: new Date("2025-02-08"), checkOut: new Date("2025-02-11"), externReference: 2222222222, createAt: new Date("2025-02-04"), room: 505, payment: 1500 },
  { id: 11525254, name: "Ana Maria", phone:"55 35 5432-3985",checkIn: new Date("2025-02-08"), checkOut: new Date("2025-02-11"), externReference: 2222222222, createAt: new Date("2025-02-05"), room: 405, payment: 1500 },
  { id: 11552554, name: "Alberto Costa EDUARDO", phone:"55 35 5432-3985",checkIn: new Date("2025-02-08"), checkOut: new Date("2025-02-11"), externReference: 2222222222, createAt: new Date("2025-02-05"), room: 302, payment: 1500 },
  { id: 15245454, name: " EDUARDO José", phone:"",checkIn: new Date("2025-02-08"), checkOut: new Date("2025-02-11"), externReference: 2222222222, createAt: new Date("2025-02-05"), room: 303, payment: 1500 },
]
export const fakeAndar : FloorListEntity[] = [
  {id: 1, name: "1 Andar", Accessibility: "Sim", Status: "Disponível", Description: "Lorem Ipsum Chablau",
  },
  {id: 2, name: "2 Andar", Accessibility: "Não", Status: "Disponível", Description: "Lorem Ipsum Chablau",
  },
  {id: 3, name: "3 Andar", Accessibility: "Sim", Status: "Disponível", Description: "Lorem Ipsum Chablau",
  },
  {id: 4, name: "4 Andar", Accessibility: "Sim", Status: "Disponível", Description: "Lorem Ipsum Chablau",
  },
]