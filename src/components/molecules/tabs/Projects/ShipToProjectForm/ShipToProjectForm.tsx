import { Flex } from "antd";
import "./shiptoprojectform.scss";

export type ShipToType = {
  infoShipTo: {
    typeOfDocument: "NIT" | "Cedula" | "Pasaporte";
    idDocument: string;
    socialReason: string;
    companyName: string;
    typeOfClient: "NIT" | "Cedula" | "Pasaporte";
    holding: "NIT" | "Cedula" | "Pasaporte";
    phone: string;
    email: string;
    city: string[];
    risk: string;
    periodBilling: string;
    typeRadication: string;
    conditionPay: string;
    address: string;
  };
};

export const ShipToProjectForm = () => {
  return <Flex className="shiptoprojectform">s</Flex>;
};
