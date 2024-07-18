import React from "react";
import { Modal, Button } from "antd";
import { Wallet } from "phosphor-react";
import "./modalNextConcilation.scss";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ModalNextConcilation = ({ visible, onClose }: Props) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={"48%"}
      className="modal-next-concilation"
    >
      <div className="modal-content">
        <div className="icon-wrapper">
          <Wallet size={22} />
        </div>
        <h2>¡Cartera conciliada!</h2>
        <h3>El 80% de la cartera fue conciliada</h3>
        <p>20 facturas con diferencia de precios</p>
        <div className="button-row">
          <Button
            className="button__action__text button__action__text__white"
            type="primary"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button className=" button__action__text  button__action__text__green" onClick={onClose}>
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
