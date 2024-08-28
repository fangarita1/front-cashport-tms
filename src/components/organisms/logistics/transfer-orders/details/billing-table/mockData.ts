import { DataType } from "./BillingTable";

export const supplierBillingsMockData: DataType[] = [
  {
    key: 1,
    id: 101,
    name: "Transport Inc.",
    baseFare: 11150.0,
    surcharges: 20.5,
    subtotal: 11170.5,
    vehicles: 5,
    status: "Preautorizado",
    url: "https://transportinc.com"
  },
  {
    key: 2,
    id: 102,
    name: "Logistics Solutions",
    baseFare: 200.0,
    surcharges: 30.0,
    subtotal: 230.0,
    vehicles: 10,
    status: "Facturado",
    url: "https://logistics-solutions.com"
  },
  {
    key: 3,
    id: 103,
    name: "QuickMove",
    baseFare: 120.0,
    surcharges: 15.0,
    subtotal: 135.0,
    vehicles: 3,
    status: "Por aceptar",
    url: "https://quickmove.com"
  },
  {
    key: 4,
    id: 104,
    name: "CargoMasters",
    baseFare: 250.0,
    surcharges: 45.0,
    subtotal: 295.0,
    vehicles: 8,
    status: "Aceptadas",
    url: "https://cargomasters.com"
  },
  {
    key: 5,
    id: 105,
    name: "FastTrack Delivery",
    baseFare: 180.0,
    surcharges: 25.0,
    subtotal: 205.0,
    vehicles: 7,
    status: "Preautorizado",
    url: "https://fasttrackdelivery.com"
  },
  {
    key: 6,
    id: 106,
    name: "Global Transport",
    baseFare: 220.0,
    surcharges: 40.0,
    subtotal: 260.0,
    vehicles: 12,
    status: "Por aceptar",
    url: "https://global-transport.com"
  }
];
