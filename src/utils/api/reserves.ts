import { formatDateDetailsReserve } from "@/helpers/formatDateDetailsReserve"

export const infoDaily = [
  {
    _id: 1,
    name: "1 diária",
    createdAt: formatDateDetailsReserve(new Date("2025-01-01T08:30:00")),
    payment: "150,60"
  },
  {
    _id: 2,
    name: "2 diária",
    createdAt: formatDateDetailsReserve(new Date("2025-01-02T14:45:00")),
    payment: "150,00"
  },
  {
    _id: 3,
    name: "3 diária",
    createdAt: formatDateDetailsReserve(new Date("2025-01-03T18:15:00")),
    payment: "250,40"
  }
];

export const infoProducts = [
  {
    _id: 1,
    name: "2 Cocacola(s)",
    createdAt: formatDateDetailsReserve(new Date("2025-01-04T09:20:00")),
    payment: "8,00"
  },
  {
    _id: 2,
    name: "1 Água",
    createdAt: formatDateDetailsReserve(new Date("2025-01-05T11:05:00")),
    payment: "3,00"
  }
];

export const infoExpenses = [
  {
    _id: 1,
    name: "2 Camisola(s)",
    createdAt: formatDateDetailsReserve(new Date("2025-01-06T16:40:00")),
    payment: "8,00"
  },
  {
    _id: 2,
    name: "1 Calça",
    createdAt: formatDateDetailsReserve(new Date("2025-01-07T19:55:00")),
    payment: "4,00"
  }
];