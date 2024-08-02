import { Flex, Modal } from "antd";
import { CaretRight, Pencil, Trash } from "phosphor-react";
import React from "react";
import "./modalActionAdjusment.scss";
import { Gavel } from "@phosphor-icons/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
  adjustment: {
    type: string | undefined;
    id: string;
    amount: string;
  };
}

export const ModalActionAdjusment = ({ isOpen, onClose, adjustment }: Props) => {
  const [currentView, setCurrentView] = React.useState<string>("selectAccountingAdjustment");
  return (
    <Modal
      open={isOpen}
      onCancel={
        currentView === "selectAccountingAdjustment"
          ? onClose
          : () => setCurrentView("selectAccountingAdjustment")
      }
      title={
        currentView === "legalizeAccountingAdjustment"
          ? `Nota credito por legalizar NC ${adjustment.id} $${adjustment.amount}`
          : "Selecciona la acción que vas a realizar"
      }
      footer={null}
      width={"40%"}
    >
      {currentView === "selectAccountingAdjustment" && (
        <div className="content">
          <Flex vertical gap="small">
            <button
              className="actionButton"
              onClick={() => setCurrentView("legalizeAccountingAdjustment")}
            >
              <p className="actionButton__text">
                <Gavel size={24} /> Legalizar ajuste contable
              </p>
              <CaretRight className="actionButton__caretRight" />
            </button>
            <button
              className="actionButton"
              onClick={() => setCurrentView("editAccountingAdjustment")}
            >
              <p className="actionButton__text">
                <Pencil size={24} />
                Editar ajuste contable
              </p>
              <CaretRight className="actionButton__caretRight" />
            </button>
            <button
              className="actionButton"
              onClick={() => setCurrentView("deleteAccountingAdjustment")}
            >
              <p className="actionButton__text">
                <Trash size={24} />
                Eliminar ajuste contable
              </p>
              <CaretRight className="actionButton__caretRight" />
            </button>
          </Flex>
        </div>
      )}
      {currentView === "legalizeAccountingAdjustment" && (
        <div className="content">
          <Flex vertical gap="small"></Flex>
        </div>
      )}
      {currentView === "editAccountingAdjustment" && (
        <div className="content">
          <Flex vertical gap="small">
            <button
              className="actionButton"
              onClick={() => setCurrentView("selectAccountingAdjustment")}
            >
              <p className="actionButton__text">
                <Pencil size={24} />
                Editar ajuste contable
              </p>
              <CaretRight className="actionButton__caretRight" />
            </button>
          </Flex>
        </div>
      )}
      {currentView === "deleteAccountingAdjustment" && (
        <div className="content">
          <Flex vertical gap="small">
            <button
              className="actionButton"
              onClick={() => setCurrentView("selectAccountingAdjustment")}
            >
              <p className="actionButton__text">
                <Trash size={24} />
                Eliminar ajuste contable
              </p>
              <CaretRight className="actionButton__caretRight" />
            </button>
          </Flex>
        </div>
      )}
    </Modal>
  );
};
