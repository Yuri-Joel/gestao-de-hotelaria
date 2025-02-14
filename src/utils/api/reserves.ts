import { formatDateDetailsReserve } from "@/helpers/formatDateDetailsReserve"

export const infoDaily = [
  {
    _id:1,
    name:"1 diaria",
    createdAt: formatDateDetailsReserve(new Date()),
    payment: "150,60"
  },
  {
    _id:2,
    name:"2 diaria",
    createdAt: formatDateDetailsReserve(new Date()),
    payment: "150,00"
  },
  {
    _id:3,
    name:"3 diaria",
    createdAt: formatDateDetailsReserve(new Date()),
    payment: "250,40"
  },
]


export const infoProducts = [
  {
    _id:1,
    name:"2 Cocacola(s)",
    createdAt: formatDateDetailsReserve(new Date()),
    payment: "8,00"
  },
  {
    _id:2,
    name:"1 Agua",
    createdAt: formatDateDetailsReserve(new Date()),
    payment: "3,00"
  },
]

export const infoExpenses = [
  {
    _id:1,
    name:"2 Camisola(s)",
    createdAt: formatDateDetailsReserve(new Date()),
    payment: "8,00"
  },
  {
    _id:2,
    name:"1 Calça",
    createdAt: formatDateDetailsReserve(new Date()),
    payment: "4,00"
  }
]