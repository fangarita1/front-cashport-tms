import React from "react";
import { Modal, Button } from "antd";
import { Wallet } from "phosphor-react";
import "./modalNextConcilation.scss";
import { InfoConcilation } from "@/types/concilation/concilation";

interface Props {
  visible: boolean;
  onClose: () => void;
  changeView: () => void;
  invoices?: InfoConcilation;
}

export const ModalNextConcilation = ({ visible, onClose, changeView, invoices }: Props) => {
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
        <h3>El {calculatePercentage(invoices).toFixed(2)}% de la cartera fue conciliada</h3>
        {invoices && invoices.reconciled_invoices.invoices.length > 0 && (
          <p> {invoices?.invoices_with_differences.quantity} facturas con diferencia de precios</p>
        )}

        <div className="button-row">
          <Button
            className="button__action__text button__action__text__white"
            type="primary"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            className=" button__action__text  button__action__text__green"
            onClick={changeView}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const calculatePercentage = (invoices: InfoConcilation | undefined) => {
  const totalInvoices =
    (invoices?.reconciled_invoices.invoices.length ?? 0) +
    (invoices?.invoices_not_found.invoices.length ?? 0) +
    (invoices?.invoices_with_differences.invoices.length ?? 0);
  const reconciledInvoices = invoices?.reconciled_invoices.invoices.length ?? 0;
  return (reconciledInvoices / totalInvoices) * 100;
};
