import { Flex, Modal } from "antd";
import { CaretRight, Pencil, Trash } from "phosphor-react";
import React from "react";
import "./modalActionAdjusment.scss";
import { Gavel } from "@phosphor-icons/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
}

export const ModalActionAdjusment = ({ isOpen, onClose }: Props) => {
  const handleAdjustmentTypeSelect = (type: string) => {
    console.log(type);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Selecciona la acción que vas a realizar"
      footer={null}
      width={"40%"}
    >
      <div className="content">
        <Flex vertical gap="small">
          <button className="actionButton" onClick={() => handleAdjustmentTypeSelect("2")}>
            <p className="actionButton__text">
              <Gavel size={24} /> Legalizar ajuste contable
            </p>
            <CaretRight className="actionButton__caretRight" />
          </button>
          <button className="actionButton" onClick={() => handleAdjustmentTypeSelect("1")}>
            <p className="actionButton__text">
              <Pencil size={24} />
              Editar ajuste contable
            </p>
            <CaretRight className="actionButton__caretRight" />
          </button>
          <button className="actionButton" onClick={() => handleAdjustmentTypeSelect("3")}>
            <p className="actionButton__text">
              <Trash size={24} />
              Eliminar ajuste contable
            </p>
            <CaretRight className="actionButton__caretRight" />
          </button>
        </Flex>
      </div>
    </Modal>
  );
};
