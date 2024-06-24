import { Dispatch, SetStateAction, useState } from "react";
import { Flex, Modal, Typography } from "antd";
import ItemsActionsModal from "@/components/atoms/ItemsModal/ItemsActionsModal";

import "./modalActionDiscountCredit.scss";
import { Plus } from "phosphor-react";

import { CreateCreditNote } from "../CreateAccountingAdjustment/CreateCreditNote/CreateCreditNote";
import { CreateDiscount } from "../CreateAccountingAdjustment/CreateDiscount/CreateDiscount";
import { CreateDebitNote } from "../CreateAccountingAdjustment/CreateDebitNote/CreateDebitNote";
const { Title } = Typography;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  showActionDetailModal: {
    isOpen: boolean;
    actionType: number;
  };
  setShowActionDetailModal: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      actionType: number;
    }>
  >;
}
interface ISelectedRows {
  id: number;
  amount: number;
}

export const ModalActionDiscountCredit = ({ isOpen, onClose, showActionDetailModal }: Props) => {
  const [selectedRows, setSelectedRows] = useState<ISelectedRows[]>([]);

  const handleHeaderClick = (item: ISelectedRows) => {
    const isExist = selectedRows.some((row) => row.id === item.id);
    if (isExist) setSelectedRows((prevRows) => prevRows.filter((row) => row.id !== item.id));
    else setSelectedRows((prevRows) => [...prevRows, item]);
  };
  const [currentView, setCurrentView] = useState("select");

  const mockData = [
    { id: 1, amount: 100000 },
    { id: 2, amount: 100000 },
    { id: 3, amount: 100000 },
    { id: 4, amount: 100000 },
    { id: 5, amount: 100000 },
    { id: 6, amount: 100000 }
  ];

  return (
    <>
      <Modal
        width={"40%"}
        open={isOpen}
        style={{ top: "10%", height: "auto" }}
        title={
          <Title level={4}>
            {(currentView === "create" && titleCreateMap[showActionDetailModal?.actionType || 1]) ||
              (currentView === "select" && titleMap[showActionDetailModal?.actionType || 1])}
          </Title>
        }
        footer={null}
        onCancel={
          currentView === "select"
            ? onClose
            : () => {
                setCurrentView("select");
              }
        }
      >
        {currentView === "select" && (
          <div className="modalContent">
            <p className="subTitleModalAction">
              {subtitleMap[showActionDetailModal?.actionType || 1]}
            </p>
            <div className="modalContentScroll">
              {mockData.map((item, index) => (
                <ItemsActionsModal
                  key={index}
                  item={item}
                  type={showActionDetailModal?.actionType || 1}
                  onHeaderClick={() => handleHeaderClick(item)}
                />
              ))}
            </div>
            <button
              type="button"
              className="button__create__action"
              onClick={() => setCurrentView("create")}
            >
              <Plus /> Crear {typeMap[showActionDetailModal?.actionType || 1]}
            </button>
            <Flex gap="8px">
              <button
                type="button"
                className="button__action__text button__action__text__white"
                onClick={() => onClose()}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={`button__action__text ${selectedRows.length > 0 ? "button__action__text__green" : ""}`}
                onClick={() => {
                  console.log(selectedRows);
                }}
              >
                Continuar
              </button>
            </Flex>
          </div>
        )}
        {currentView === "create" && (
          <>
            {showActionDetailModal.actionType === 1 && (
              <CreateDebitNote
                onClose={() => {
                  setCurrentView("select");
                }}
              />
            )}
            {showActionDetailModal.actionType === 2 && (
              <CreateCreditNote
                onClose={() => {
                  setCurrentView("select");
                }}
              />
            )}
            {showActionDetailModal.actionType === 3 && (
              <CreateDiscount
                onClose={() => {
                  setCurrentView("select");
                }}
              />
            )}
          </>
        )}
      </Modal>
    </>
  );
};
const subtitleMap: Record<number, string> = {
  1: "Selecciona la(s) nota(s) débito a aplicar",
  2: "Selecciona la(s) nota(s) crédito a aplicar",
  3: "Selecciona los descuento a aplicar"
};
const titleMap: Record<number, string> = {
  1: "Aplicar nota débito",
  2: "Aplicar nota crédito",
  3: "Aplicar descuento"
};
const titleCreateMap: Record<number, string> = {
  1: "Crear nota débito",
  2: "Crear nota crédito",
  3: "Crear descuento"
};
const typeMap: Record<number, string> = {
  1: "débito",
  2: "crédito",
  3: "descuento"
};
