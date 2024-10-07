import { STATUS } from "./globalConstants";

export const TripState = [
  {
    id: STATUS.TRIP.CARGANDO,
    bgColor: '#0085FF',
    textColor: '#FFFFFF'
  },
  {
    id: STATUS.TRIP.EN_CURSO,
    bgColor: '#CBE71E',
    textColor: '#141414'
  },
  {
    id: STATUS.TRIP.DESCARGANDO,
    bgColor: '#FE7A01',
    textColor: '#FFFFFF'
  },
  {
    id: STATUS.TRIP.DETENIDO,
    bgColor: '#C80000',
    textColor: '#FFFFFF'
  },
  {
    id: STATUS.TRIP.STAND_BY,
    bgColor: '#F2CB05',
    textColor: '#141414'
  },
];
