import { Modal } from "antd";

import "./modalcreateshipto.scss";
interface Props {
  isOpen: boolean;
}

export const ModalCreateShipTo = ({ isOpen }: Props) => {
  return <Modal open={isOpen} title="Crear nuevo Ship To" className="modalcreateshipto"></Modal>;
};
